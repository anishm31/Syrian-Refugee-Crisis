# Description: Scrape UNHCR API for data on Syrian refugees in a specific countries of asylum
# Author: Matthew Albert

# Imports 

import requests
import json
import os
import time
from pprint import pprint
import matplotlib
matplotlib.use('Agg')
#had to download pip install azure-cognitiveservices-search-imagesearch for this
from azure.cognitiveservices.search.imagesearch import ImageSearchClient
from msrest.authentication import CognitiveServicesCredentials
import matplotlib.pyplot as plt
from PIL import Image
from io import BytesIO

# Set specific query fields for scrape

syria_iso = "SYR"                              # ISO code for Syria (country of origin)
endpoints = ["reports"] # API endpoints to scrape


news_data = []
json_file_path = "./models_data/news_db.json"
# Iterate through each endpoint to scrape necessary attributes
#got rid of params
    # Make request to UNHCR API
response = requests.get(f"https://api.reliefweb.int/v1/reports?appname=apidoc&query[value]=syrian refugees&query[fields][]=source&fields[include][]=source.shortname&fields[include][]=disaster_type.name&fields[include][]=primary_country.shortname&fields[include][]=date.created&fields[include][]=image&fields[include][]=headline.title&fields[include][]=theme.name&fields[include][]=source.id&fields[include][]=country.iso3&fields[include][]=url&limit=75")
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
        "Themes":[],
        "OrgLink":"",
        "Video":"",
        "ISO":"",
        "SourceID":[]
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
        link = fields.get("url")
        iso = fields.get("country")[0].get("iso3")
      
        sources_list = fields.get("source")
        source = []
        for i in sources_list:
          source.append(i.get("shortname")+" ")
          instance_template["attributes"]["SourceID"].append((i).get("id"))

        theme_list = fields.get("theme")
        theme = []
        if theme_list is not None:
          for i in theme_list:
            theme.append(i.get("name"))
          
          


        instance_template["Title"]=title
        instance_template["Date"]=date
        instance_template["attributes"]["PrimaryCountry"]=primary_country
        instance_template["attributes"]["DisasterType"]=  disaster_list
        instance_template["Image"]= image
        instance_template["attributes"]["OtherSources"]= source
        instance_template["attributes"]["OrgLink"]= link
        instance_template["attributes"]["Themes"]= theme
        instance_template["attributes"]["ISO"]= iso
        
        


        #bing image search 
        subscription_key = "6593dbe5ca00458b890062640971c88c"
        search_url = "https://api.bing.microsoft.com/v7.0/images/search"
        search_term = instance_template["Title"]
        headers = {"Ocp-Apim-Subscription-Key" : subscription_key}
        params = {"q": search_term, "license":"public", "count":"1", "offset":"0"}
        time.sleep(1)
        response = requests.get(search_url, headers=headers, params=params)
        response.raise_for_status()
        search_results = response.json()
        instance_template["Image"] = [img["thumbnailUrl"] for img in search_results["value"][:16]]

        #getting bing video 
        search_url = "https://api.bing.microsoft.com/v7.0/videos/search"
        params = {"q": search_term, "license":"public", "count":"1", "offset":"0", "embedded":"player", "pricing":"free"}
        response = requests.get(search_url, headers=headers, params=params)
        response.raise_for_status()
        search_results = response.json()
        instance_template["attributes"]["Video"] = [Videos["webSearchUrl"] for Videos in search_results["value"][:16]]

        if instance_template["Image"] is not None : 
          if disaster_list is not None:
              for i in disaster_list:
                disaster.append(i.get("name"))
          instance_template["attributes"]["DisasterType"]= disaster

          #only add news/events that have disaster and an image
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





