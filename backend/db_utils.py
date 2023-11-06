from sqlalchemy import text
from application import Charity, Country, NewsEvent, db, flaskApp
import json
import time
import copy

# Path to AWS Instance
db_url = "mysql+pymysql://admin:wsHxSdz0cSqqYu82SWrT@database-mmaps.cpt6ed6ivedi.us-west-2.rds.amazonaws.com:3306/database_mmaps"

# Creates a new database (Should only be run once)
def create_database():
    engine = db.create_engine(db_url, echo=True)
    with engine.connect() as conn:
        conn.execute(text("CREATE DATABASE database_mmaps"))
        print("Database created...")
        # Print available databases to verify creation
        result = conn.execute(text("SHOW DATABASES"))
        for r in result:
            print(r)
        result.close()
        
# Function used to clear a database of all contents and populate it with new instance data
def populate_database():
  # Instantiate database session
  with flaskApp.app_context():
    # Remove previous tables from db and add new tables (from models.py)
    db.session.remove()
    db.drop_all()
    db.create_all()
    # Popualte database with all instances of each model
    add_charities()
    time.sleep(1)
    add_countries()
    time.sleep(1)
    add_news_events()
    # Commit all changes to RDS database
    db.session.commit()

# Function used to add all charity instances to the database
def add_charities():
  # Load json data into list of charities
  with open("data_scraping/models_data/charity_db.json", "r", encoding="utf-8") as f:
    charities = json.load(f)
    # Iterate through charities and add each to the database
    count_id = 1
    for charity in charities:
      # Define dictionary template to store field for each charity.
      # Populate dictionary with relevant fields from charity instance.
      charity_instance = {
        "id": count_id,
        "name": charity["name"],
        "description": charity["attributes"]["description"],
        "org_type": charity["attributes"]["org_type"],
        "logo_img": charity["attributes"]["logo_img"],
        "org_img": charity["attributes"]["org_img"],
        "established": charity["attributes"]["established"],
        "short_name": charity["attributes"]["short_name"],
        "long_name": charity["attributes"]["long_name"],
        "parent_org": charity["attributes"]["parent_org"],
        "headquarters": charity["attributes"]["headquarters"],
        "hq_country": charity["attributes"]["hq_country"],
        "awards_received": charity["attributes"]["awards_received"],
        "website": charity["attributes"]["website"],
        "relief_web_id": int(charity["attributes"]["relief_web_id"]),
        "relief_web_url": charity["attributes"]["relief_web_url"],
        "relief_provided": charity["attributes"]["relief_provided"],
        "youtube_info": charity["attributes"]["youtube_info"],
        "relevant_countries": charity["attributes"]["relevant_countries"],
        "relevant_news_events": []
      }
      # Unpack dictionary into Charity model instance and add to database
      db.session.add(Charity(**charity_instance))
      # Print status
      print(f"Successfully added {count_id}/{len(charities)} charities to database...")
      count_id += 1

# Function used to add all country instances to the database
def add_countries():
  # Load json data into list of countries
  with open("data_scraping/models_data/country_db.json", "r", encoding="utf-8") as f:
    countries = json.load(f)
    # Iterate through countries and add each to the database
    count_id = 1
    for country in countries:
      # Define dictionary template to store fields for each country.
      # Populate dictionary with relevant fields from country instance.
      country_instance = {
        "id": count_id,
        "name": country["country_name"],
        "country_iso3": country["attributes"]["country_iso3"],
        "flag_url": country["attributes"]["flag_url"],
        "map_info": country["attributes"]["map_info"],
        "capital": country["attributes"]["capital"],
        "num_refugees": int(country["attributes"]["num_refugees"]),
        "num_asylum_decisions": int(country["attributes"]["num_asylum_decisions"]),
        "year_of_decisions": int(country["attributes"]["year_of_decisions"]),
        "num_recognized": int(country["attributes"]["num_recognized"]),
        "num_other": int(country["attributes"]["num_other"]),
        "num_apps_rejected": int(country["attributes"]["num_apps_rejected"]),
        "num_closed": int(country["attributes"]["num_closed"]),
        "relevant_charities": [],
        "relevant_news_events": []
      }
      # Unpack and add country instance to database
      db.session.add(Country(**country_instance))
      # Print status
      print(f"Successfully added {count_id}/{len(countries)} countries to database...")
      count_id += 1
      
# Function used to add all news/events instances to the database
def add_news_events():
  # Load json data into a list
  with open("data_scraping/models_data/news_db.json", "r", encoding="utf-8") as f:
    news = json.load(f)
    # Iterate through each news/events instance and add to the database
    count_id = 1
    for event in news:
      # Define dictionary to store row of data
      news_instance = {
        "id": count_id,
        "title": event["Title"],
        "date": event["Date"],
        "image_url": event["Image"],
        "disaster_type": event["attributes"]["DisasterType"],
        "primary_country": event["attributes"]["PrimaryCountry"],
        "country_iso3": event["attributes"]["ISO"],
        "sources": event["attributes"]["OtherSources"],
        "themes": event["attributes"]["Themes"],
        "org_link": event["attributes"]["OrgLink"],
        "video_url": event["attributes"]["Video"],
        "source_ids": event["attributes"]["SourceID"],
        "relevant_charities": [],
        "relevant_countries": []
      }
      # Unpack and add news/events instance to database
      db.session.add(NewsEvent(**news_instance))
      # Print status
      print(f"Successfully added {count_id}/{len(news)} news/events to database...")
      count_id += 1

# Function used to compute relevant charities and news/events for each country
def compute_charity_connections():
  # Retrieve all charities from database
  charities = Charity.query.all()
  # Iterate through all charities
  count = 1
  for charity in charities:
    MAX_CONNECTIONS = 5
    # Define list to store relevant countries
    relevant_countries = []
    # Retrieve list of primary relevant countries from charity instance
    primary_countries = charity.referenced_countries["primary_countries"]
    # Iterate through primary relevant countries and store countries that are in the database
    for iso3 in primary_countries:
      if len(relevant_countries) >= MAX_CONNECTIONS:
        break
      relevant_country = {
      "country_name": "",
      "country_db_id": 0
      }
      # Retrieve country from database
      country_instance = Country.query.filter_by(country_iso3=iso3).first()
      # If country is in database, add to relevant countries
      if country_instance:
        relevant_country["country_name"] = country_instance.name
        relevant_country["country_db_id"] = country_instance.id
        relevant_countries.append(relevant_country)
    if len(relevant_countries) < 2:
      # Perform same process for secondary relevant countries
      secondary_countries = charity.referenced_countries["secondary_countries"]
      for iso3 in secondary_countries:
        if len(relevant_countries) >= MAX_CONNECTIONS:
          break
        relevant_country = {
        "country_name": "",
        "country_db_id": 0
        }
        country_instance = Country.query.filter_by(country_iso3=iso3).first()
        if country_instance:
          relevant_country["country_name"] = country_instance.name
          relevant_country["country_db_id"] = country_instance.id
          relevant_countries.append(relevant_country)
    # Store relevant countries in charity instance
    charity.relevant_countries = relevant_countries
    
    # Now, define list to store relevant news/events
    relevant_news_events = list()
    # Retrieve list of news/events where the source is this charity instance
    results = NewsEvent.query.filter(NewsEvent.source_ids.contains(str(charity.relief_web_id))).all()
    for result in results:
      if len(relevant_news_events) >= MAX_CONNECTIONS:
        break
      relevant_news_events.append({"news_event_title": result.title, "news_event_db_id": result.id})
      
    if len(relevant_news_events) < 2:
      # Perform same process for secondary connection criteria (themes/relief type)
      relief_types = charity.relief_provided
      for relief in relief_types:
        results = NewsEvent.query.filter(NewsEvent.themes.contains(relief)).all()
        for result in results:
          if len(relevant_news_events) >= MAX_CONNECTIONS:
            break
          relevant_news_events.append({"news_event_title": result.title, "news_event_db_id": result.id})
    # Store relevant news/events in charity instance
    charity.relevant_news_events = relevant_news_events
    # Print status
    print(f"Successfully computed connections for... {count}/{len(charities)} charities")
    if len(relevant_news_events) < 2 or len(relevant_countries) < 2:
      print(f"Charity {charity.name} has less than 2 connections...")
    count += 1
  # Commit all changes to database
  db.session.commit()
  
# Function used to compute relevant charities and news/events for each country
def compute_country_connections():
  # Retrieve all countries from database
  countries = Country.query.all()
  count = 1
  # Iterate through all countries
  for country in countries:
    MAX_CONNECTIONS = 5
    # Define list to store relevant charities
    relevant_charities = []
    # Retrieve list of relevant charities by connecting the country's iso3 code to the
    # referenced countries (which are iso3s) of each charity
    
    # Query for charity that has the country's iso3 code in its referenced countries primary_countries list
    results = Charity.query.filter(Charity.referenced_countries["primary_countries"].contains(country.country_iso3)).all()
    for res in results:
      if len(relevant_charities) >= MAX_CONNECTIONS:
        break
      relevant_charities.append({"charity_name": res.name, "charity_db_id": res.id})
    if len(relevant_charities) < 2:
      # Perform same process for secondary connection criteria (secondary_countries list)
      results = Charity.query.filter(Charity.referenced_countries["secondary_countries"].contains(country.country_iso3)).all()
      for res in results:
        if len(relevant_charities) >= MAX_CONNECTIONS:
          break
        relevant_charities.append({"charity_name": res.name, "charity_db_id": res.id})
        
    if len(relevant_charities) < 2:
      print(f"Country {country.name} has less than 2 connections for charities...")
      relevant_charities.append({"charity_name": "United Nations Children's Fund", "charity_db_id": 11})
      relevant_charities.append({"charity_name": "International Federation of Red Cross and Red Crescent Societies", "charity_db_id": 16})
    # Store relevant charities in country instance
    country.relevant_charities = relevant_charities
    
    # Now, define list to store relevant news/events
    relevant_news_events = []
    # Retrieve list of news/events where the primary country (iso3) is this country instance
    results = NewsEvent.query.filter_by(country_iso3=country.country_iso3).all()
    for res in results:
      if len(relevant_news_events) >= MAX_CONNECTIONS:
        break
      relevant_news_events.append({"news_event_title": res.title, "news_event_db_id": res.id})
    if len(relevant_news_events) < 2 and len(relevant_charities) >= 1:
      # Perform same process for secondary connection criteria (using relevant_news from relevant charities)
      stop = 2 if len(relevant_charities) >= 2 else 1
      for i in range(0, stop):
        charity_id = relevant_charities[i]["charity_db_id"]
        # Query to find charity instance
        charity = Charity.query.filter_by(id=charity_id).first()
        relevants = charity.relevant_news_events
        for news_event in relevants:
          if len(relevant_news_events) >= MAX_CONNECTIONS:
            break
          relevant_news_events.append({"news_event_title": news_event["news_event_title"], "news_event_db_id": news_event["news_event_db_id"]})
    
    if len(relevant_news_events) < 2:
      print(f"Country {country.name} has less than 2 connections for news/events...")
      relevant_news_events.append({"news_event_title": "Open Letter to United Nations Security Council Ambassadors regarding the upcoming vote on the Syria cross-border resolution", "news_event_db_id": 9})
      relevant_news_events.append({"news_event_title": "Uniting for Peace in Syria: Global Civil Society Appeal to UN Member States", "news_event_db_id": 12})
    # Store relevant news/events in country instance
    country.relevant_news_events = relevant_news_events
    # Print status
    print(f"Successfully computed connections for...{count}/{len(countries)} countries")
    count += 1
  # Commit all changes to database
  db.session.commit()
  
# Function used to compute relevant charities and countries for each news/events instance
def compute_news_events_connections():
  # Retrieve all news/events from db
  news_events = NewsEvent.query.all()
  count = 1
  for news in news_events:
    MAX_CONNECTIONS = 5
    # Find connections to charities
    relevant_charities = []
    # Iterate through source ids and find/store charities that match
    for source_id in news.source_ids:
      if len(relevant_charities) >= MAX_CONNECTIONS:
        break
      result = Charity.query.filter_by(relief_web_id=source_id).first()
      if result is not None:
        relevant_charities.append({"charity_name": result.name, "charity_db_id": result.id})
    if len(relevant_charities) < 2:
      # Perform same process on secondary criteria (themes and relief type)
      for theme in news.themes:
        if len(relevant_charities) >= MAX_CONNECTIONS:
          break
        theme = theme.split(" ")[0]
        results = Charity.query.filter(Charity.relief_provided.like(f"%{theme}%")).all()
        for result in results:
          if len(relevant_charities) >= MAX_CONNECTIONS:
            break
          relevant_charities.append({"charity_name": result.name, "charity_db_id": result.id})
    if (len(relevant_charities) < 2):
      print(f"News {news.title} has less than 2 connections for charities...")
      relevant_charities.append({"charity_name": "United Nations Children's Fund", "charity_db_id": 11})
      relevant_charities.append({"charity_name": "United Nations High Commissioner for Refugees", "charity_db_id": 10})
    # Store relevant charities
    news.relevant_charities = relevant_charities
    
    # Now, determine connections to countries
    relevant_countries = []
    # Use primary country ISO to find country instance
    result = Country.query.filter_by(country_iso3=news.country_iso3).first()
    if result is not None:
      relevant_countries.append({"country_name": result.name, "country_db_id": result.id})
    if len(relevant_countries) < 2:
      # Perform same process on secondary criteria (referenced countries from relevant charities)
      for charity in relevant_charities:
        if len(relevant_countries) >= MAX_CONNECTIONS:
          break
        charity_id = charity["charity_db_id"]
        charity_instance = Charity.query.filter_by(id=charity_id).first()
        for country in charity_instance.relevant_countries:
          # Make sure country not already present in relevant countries
          already_present = False
          for c in relevant_countries:
            if c["country_name"] == country["country_name"]:
              already_present = True
              break
          if len(relevant_countries) >= MAX_CONNECTIONS:
            break
          elif already_present:
            continue
          relevant_countries.append({"country_name": country["country_name"], "country_db_id": country["country_db_id"]})
    if len(relevant_countries) < 2:
      print(f"News {news.title} has less than 2 connections for countries...")
    # Stor relevant countries
    news.relevant_countries = relevant_countries
    # Print status
    print(f"Successfully computed connections for...{count}/{len(news_events)} news/events")
    count += 1
  # Commit all changes to database
  db.session.commit()
  
# Function to update sources in news/events to store if the source is a charity in the DB or not
def update_news_sources():
  # Retrieve all news/events from db
  news_events = NewsEvent.query.all()
  for news in news_events:
    # Define list to store sources
    new_sources = []
    for source in news.sources:
      # Define dict to store json source data
      source_data = {
        "source_short_name": "",
        "source_reg_name": "",
        "in_db": False
      }
      # Query for source in Charity table
      result = Charity.query.filter_by(short_name=source).first()
      if result is not None:
        # Source is an instance in the DB
        source_data["source_short_name"] = result.short_name
        source_data["source_reg_name"] = result.name
        source_data["in_db"] = True
      else:
        # Source is not an instance in the DB
        source_data["source_short_name"] = source
      # Add to sources list
      new_sources.append(source_data)
    news.sources = new_sources
  # Commit all changes to database
  db.session.commit()
  
# Function to create a FULLTEXT index on the country table for searching   
def create_country_search_index(create_columns=False):
  if create_columns:
    # Create new columns for current columns that are JSON and store as TEXT
    db.session.execute(text("ALTER TABLE country ADD capital_as_text TEXT"))
    db.session.execute(text("ALTER TABLE country ADD year_as_text TEXT"))
    db.session.execute(text("ALTER TABLE country ADD relevant_charities_as_text TEXT"))
    db.session.execute(text("ALTER TABLE country ADD relevant_news_events_as_text TEXT"))
  
  time.sleep(1)
  
  countries =  Country.query.all()
  
  # Convert JSON columns to TEXT
  for country in countries:
    # Convert capital list to text
    capitals = country.capital
    capitals = ", ".join(capitals)
    country.capital_as_text = capitals
    
    # Convert year_of_decisions to text
    year = str(country.year_of_decisions)
    country.year_as_text = year
    
    # Convert relevant charities to text (comma separated list)
    relevant_charities = country.relevant_charities
    relevant_charities = [charity["charity_name"] for charity in relevant_charities]
    relevant_charities = ", ".join(relevant_charities)
    country.relevant_charities_as_text = relevant_charities
    
    # Convert relevant news/events to text (comma separated list)
    relevant_news_events = country.relevant_news_events
    relevant_news_events = [news_event["news_event_title"] for news_event in relevant_news_events]
    relevant_news_events = ", ".join(relevant_news_events)
    country.relevant_news_events_as_text = relevant_news_events
  db.session.commit()
  
  time.sleep(1)
  
  # Create FULLTEXT index on country table
  db.session.execute(text("ALTER TABLE country ADD FULLTEXT (name, country_iso3, capital_as_text, year_as_text, relevant_charities_as_text, relevant_news_events_as_text)"))
  

if __name__ == "__main__":
    with flaskApp.app_context():
      pass