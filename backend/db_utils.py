from flask import Flask
from sqlalchemy import text
from models import Charity, Country, NewsEvent, db, app
import json
import time

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
  with app.app_context():
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


if __name__ == "__main__":
    # print("Populating database...")
    # populate_database()
    # print("Database populated!")
    pass