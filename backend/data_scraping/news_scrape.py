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
response = requests.get(f"https://api.reliefweb.int/v1/reports?appname=apidoc&query[value]=Syrian Refugee&query[fields][]=source&fields[include][]=source.shortname&fields[include][]=disaster_type.name&fields[include][]=primary_country.shortname&fields[include][]=date.created&fields[include][]=image&fields[include][]=headline.title&fields[include][]=theme.name")
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
        "DisasterType" : [],
        "PrimaryCountry" : "",
        "OtherSources": {},
        "Themes":[]
        }
        }

        # Declare template for storing data in json format
        fields = report["fields"]
        title = fields.get("title")
        date = fields.get("date").get("created")
        primary_country = fields.get("primary_country").get("shortname")
        image = fields.get("headline")
        disaster_list = fields.get("disaster_type")
        disaster = []
      


        sources_list = fields.get("source")
        source = []
        for i in sources_list:
          source.append(i.get("shortname"))

        theme_list = fields.get("theme")
        theme = []
        for i in theme_list:
          theme.append(i.get("name"))

        instance_template["Title"]=title
        instance_template["Date"]=date
        instance_template["attributes"]["PrimaryCountry"]=primary_country
        instance_template["attributes"]["DisasterType"]=  disaster_list
        instance_template["Image"]= image
        instance_template["attributes"]["OtherSources"]= source
        instance_template["attributes"]["Themes"]= theme

        #news_data.append(instance_template)
        
        if instance_template["attributes"]["DisasterType"] is not None:
          for i in disaster_list:
            disaster.append(i.get("name"))
          instance_template["attributes"]["DisasterType"]= disaster

          news_data.append(instance_template)
          wiki_disaster =  disaster[0]
          # Scrape for Wikipedia for flag image
          wiki_params = {
            "action": "query",
            "format": "json",
            "titles": f"{wiki_disaster}",
            "prop": "pageimages",
            "piprop": "original"
          }
          response = requests.get("https://en.wikipedia.org/w/api.php", params=wiki_params)
          if response.status_code == 200:
            # Extact URL from JSON response and store
            response_data = response.json()['query']['pages']
            flag_url = list(response_data.values())[0]['original']['source']
            instance_template["Image"] = flag_url
          else:
            # Error, print status code
            print(f"Request Error: {response.status_code}")
            print(f"Request URL: {response.url}")
            print(f"Request Failure Reason: {response.request.reason}")
            exit(1)
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





