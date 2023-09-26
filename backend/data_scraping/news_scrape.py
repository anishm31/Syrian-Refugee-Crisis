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
response = requests.get(f"https://api.reliefweb.int/v1/reports?appname=apidoc&query[value]=syria&query[fields][]=source&fields[include][]=source.name")
if response.status_code == 200:
      # Success, store data in json template
      response_data = response.json()
      #assert(len(response_data["fields"]) > 0)
      #why negative 1?
      item_index = -1


      #loop through all of the reports on syrian refugees 
      for report in response_data["data"]:
        # Declare template for storing data in json format
        fields = report["fields"]
        title = fields.get("title")
        instance_template = {
        "title" : "",}
  
        instance_template["title"]=title
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





