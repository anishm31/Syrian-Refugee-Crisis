# Description: Scrape UNHCR API for data on Syrian refugees in a specific countries of asylum
# Author: Matthew Albert

# Imports 

import requests
import json

# Set specific query fields for scrape

syria_iso = "SYR"                              # ISO code for Syria (country of origin)
endpoints = ["reports"] # API endpoints to scrape


news_data = []
json_file_path = "./models_data/news_db.json"

# Iterate through each endpoint to scrape necessary attributes
#got rid of params
    # Make request to UNHCR API
response = requests.get(f"https://api.reliefweb.int/v1/reports?appname=apidoc&query[value]=Syrian Refugee&query[fields][]=source&fields[include][]=source.shortname&fields[include][]=disaster_type.name&fields[include][]=primary_country.shortname&fields[include][]=date.created&fields[include][]=image&fields[include][]=headline.title")
if response.status_code == 200:
      # Success, store data in json template
      response_data = response.json()
      #assert(len(response_data["fields"]) > 0)
      #why negative 1?
      item_index = -1



      #loop through all of the reports on syrian refugees 
      for report in response_data["data"]:
        instance_template = {
        "Title" : "", "Date": "", "Source":"", "Image":"",
        "attributes" : {
        "Disaster type" : "",
        "Primary Country" : "",
        "Other Sources": {},
    }
        }
        # Declare template for storing data in json format
        fields = report["fields"]
        title = fields.get("title")
        date = fields.get("date").get("created")
        primary_country = fields.get("primary_country").get("shortname")
        image = fields.get("headline")

        if image is not None:
          image = fields.get("headline").get("image")
          if image is not None:
            image = fields.get("headline").get("image").get("url")
  
        instance_template["Title"]=title
        instance_template["Date"]=date
        instance_template["attributes"]["Primary Country"]=primary_country
    
        news_data.append(instance_template)
else:
      # Error, print status code
      print(f"Request Error: {response.status_code}")
      print(f"Request URL: {response.url}")
      print(f"Request Failure Reason: {response.request.reason}")
      exit(1)

  # Append instance to country data list
  
# Write country data to json file
with open(json_file_path, "w") as json_file:
  json.dump(news_data, json_file, indent=2)





