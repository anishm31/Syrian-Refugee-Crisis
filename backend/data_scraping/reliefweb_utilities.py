import requests
import json
import time
from bs4 import BeautifulSoup

URL = "https://api.reliefweb.int/v1/reports"

# Function used to determine relevant countries that connect to a given charity/organization
def get_relevant_countries(charity, charity_id):
  # Define API parameters
  params = {
    "appname" : "syrianrefugeecrisis",
    "query[value]" : "syrian refugees",
    "profile" : "full",
    "filter[field]" : "source.id",
    "filter[value]" : charity_id,
    "fields[include][]" : "country",
    "limit" : 200
  }
  # Define template to store relevant countries
  relevant_countries = {
    "primary_countries" : set(),
    "secondary_countries" : set()
  }
  # Make request to retrieve documents/reports pertaining to the query
  response = requests.get(URL, params=params)
  # Verify status of response
  if response.status_code == 200 and response.json()["count"] > 0:
    # Parse relevant countries from response of documents/reports and store
    for report in response.json()["data"]:
      # Add all countries to list (if present)
      if report["fields"].get("country") is not None:
        for country in report["fields"]["country"]:
          country_name = country["name"]
          country_iso3 = country["iso3"]
          if country_name != "World":
            # Determine if current country is the primary country for the report
            if country.get("primary") == True:
              relevant_countries["primary_countries"].add(country_iso3.upper())
            else:
              relevant_countries["secondary_countries"].add(country_iso3.upper())
    # Remove duplicates sets
    relevant_countries["secondary_countries"] = relevant_countries["secondary_countries"].difference(relevant_countries["primary_countries"])
  elif response.json()["count"] == 0:
    # Default to Syria being the relevant country if no documents/reports are found
    relevant_countries["primary_countries"].add("SYR")
  else:
    print(f"Request for relevant countries for {charity} failed: {response.status_code}")
    return []
  
  # Convert fields of relevant_countries to lists and return
  relevant_countries["primary_countries"] = list(relevant_countries["primary_countries"])
  relevant_countries["secondary_countries"] = list(relevant_countries["secondary_countries"])
  return relevant_countries

# Function to retrieve the youtube channel links for each charity/organization
def scape_youtube_channels(charity_db_path):
  # Opening charity_db json file
  with open(charity_db_path) as f:
    charity_db = json.load(f)
  # Iterate through each charity in the charity_db and get organization url
  count = 0
  charity_num = 1
  for charity in charity_db:
    print(f"Retrieving link for charity...{charity_num}/{len(charity_db)}")
    charity_num += 1
    # Get organization ReliefWeb URL
    url = charity["attributes"]["relief_web_url"]
    # Make request to get page HTML
    response = requests.get(url)
    # Verify status of response
    if response.status_code == 200:
      # Create the soup
      soup = BeautifulSoup(response.content, "html.parser")
      # Find the youtube channel link among the social media links
      social_links = soup.find_all("a", class_="rw-entity-social-media-links__link")
      for link in social_links:
        social_media_platform = link.text.lower()
        if social_media_platform == "youtube":
          # Add new field for youtube channel link
          charity["attributes"].update({"youtube_channel" : link["href"]})
          count += 1
          break
    else:
      print(f"Request for {charity['name']} failed: {response.status_code}")
    # Sleep for 5 seconds to avoid rate limiting
    time.sleep(5)
    
  # Write charity_db to file to save changes
  with open(charity_db_path, "w") as f:
    json.dump(charity_db, f, indent=2)
  print(f"Retrieved youtube channel links for {count}/{len(charity_db)} charities")
  
print(scape_youtube_channels("models_data/charity_db.json"))