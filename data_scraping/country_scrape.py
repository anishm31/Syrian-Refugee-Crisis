# Description: Scrape UNHCR API for data on Syrian refugees in a specific countries of asylum
# Author: Matthew Albert

# Imports 

import requests
import json

# Set specific query fields for scrape

syria_iso = "SYR"                              # ISO code for Syria (country of origin)
endpoints = ["population", "asylum-decisions"] # API endpoints to scrape
countries = ["DEU", "TUR", "JOR"]              # ISO codes for countries of asylum
num_instances = 30                             # Num items to return
year_from = 2015                               # Fetch results starting from this year (inclusive)
year_to = 2023                                 # Fetch results ending at this year (inclusive)

country_data = []
json_file_path = "./models_data/country_db.json"

# Iterate through each country of asylum to scrape 3 instances
for country in countries:
  # Declare template for storing data in json format
  instance_template = {
    "country" : "",
    "country_iso3" : country,
    "attributes" : {
      "num_refugees" : 0,
      "num_asylum_decisions" : 0,
      "year_of_decisions" : 0,
      "num_recognized" : 0,
      "num_other" : 0,
      "num_apps_rejected" : 0,
      "num_closed" : 0
    }
  }
  # Iterate through each endpoint to scrape necessary attributes
  for endpoint in endpoints:
    params = {
      "limit" : num_instances,
      "yearFrom" : year_from,
      "yearTo" : year_to,
      "coo" : syria_iso,
      "coa" : country,
      "cf_type" : "ISO" # Search for countries using ISO3 country codes
    }
    # Make request to UNHCR API
    response = requests.get(f"https://api.unhcr.org/population/v1/{endpoint}/", params=params)
    if response.status_code == 200:
      # Success, store data in json template
      response_data = response.json()
      assert(len(response_data["items"]) > 0)
      item_index = -1
      if endpoint == "population":
        # Store population dataset specific attribute
        instance_template["attributes"]["num_refugees"] = response_data["items"][item_index]["refugees"]
        instance_template["country"] = response_data["items"][item_index]["coa_name"]
      else:
        # Store asylum decisions dataset specific attributes
        instance_template["attributes"]["num_asylum_decisions"] = response_data["items"][item_index]["dec_total"]
        instance_template["attributes"]["year_of_decisions"] = response_data["items"][item_index]["year"]
        instance_template["attributes"]["num_recognized"] = response_data["items"][item_index]["dec_recognized"]
        instance_template["attributes"]["num_apps_rejected"] = response_data["items"][item_index]["dec_rejected"]
        instance_template["attributes"]["num_other"] = response_data["items"][item_index]["dec_other"]
        instance_template["attributes"]["num_closed"] = response_data["items"][item_index]["dec_closed"]
    else:
      # Error, print status code
      print(f"Request Error: {response.status_code}")
      print(f"Request URL: {response.url}")
      print(f"Request Failure Reason: {response.request.reason}")
      exit(1)
  print(f'Successfully scraped data for {instance_template["country"]}')
  # Append instance to country data list
  country_data.append(instance_template)
  
# Write country data to json file
with open(json_file_path, "w") as json_file:
  json.dump(country_data, json_file, indent=2)





