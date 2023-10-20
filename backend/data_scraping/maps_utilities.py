# Import necessary packages and set up environment (e.g. API key)
import requests
import os
from dotenv import load_dotenv
load_dotenv(dotenv_path="../../secrets.env")


# Import/define necessary variables
ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json"
KEY = os.environ["GOOGLE_API"]

# Main function to collect geolocation info for each country
def get_map_info(country):
  # Define API params
  params = {
    "address" : country,
    "key" : KEY
  }
  try :
    response = requests.get(ENDPOINT, params=params, verify=True)
    # Extract map info form response and return
    map_info = response.json()["results"][0]
    return map_info
  except :
    print(f"Map Info Scraping Error: Country = {country}, Error Code = {response.status_code}")
    if response.status_code == 200 :
      print(f"API Reponse: {response.json()}")
    return ""
