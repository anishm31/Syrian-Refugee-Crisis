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
response = requests.get(f"https://api.reliefweb.int/v1/reports?appname=apidoc&query[value]=earthquake&query[fields][]=source&fields[include][]=source.shortname&fields[include][]=disaster_type.name&fields[include][]=primary_country.shortname&fields[include][]=date.created&fields[include][]=image&fields[include][]=headline.title&fields[include][]=theme.name&fields[include][]=url&limit=75")
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
      


        sources_list = fields.get("source")
        source = []
        for i in sources_list:
          source.append(i.get("shortname")+" ")

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
        

        #news_data.append(instance_template)
        
        if instance_template["attributes"]["DisasterType"] is not None and instance_template["attributes"]["OrgLink"] is not None: 
          for i in disaster_list:
            disaster.append(i.get("name"))
          instance_template["attributes"]["DisasterType"]= disaster

          #only add news/events that have disaster filled out
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

          blah = wiki_disaster
          bing_params = {
            "q" : blah,
            "count":1,
            "offset": 0 
          }

          # bing_api_key = 'f9a65a3fc286459cbb519a7724274fa9'

          # headers = {
          #   'Ocp-Apim-Subscription-Key': bing_api_key
          # }
          
          # subscriptionKey = "f9a65a3fc286459cbb519a7724274fa9"
          # customConfigId = "17af88cf-4940-47d0-bec4-1aaf3b509c61" 
          # searchTerm = "dogs" 
          # #cannot get this to work  
          # url = 'https://api.bing.microsoft.com/v7.0//custom/images/search?' + 'q=' + searchTerm + '&' + 'customconfig=' + customConfigId
          # time.sleep(1)
          # r = requests.get(url, headers={'Ocp-Apim-Subscription-Key': subscriptionKey})
          # ret = r.json()
          #pprint(json.loads(r.text))
          # with open(json_file_path, "w") as json_file:
          #   json.dump(ret, json_file, indent=2)

          # if 'Images' in ret and len(ret['Images']) > 0:
          #   instance_template["Image"]= ret['value'][0]['Images']
          #   #instance_template["Image"]= ret.thumbnail_url
          # else:
          #   print("No image results returned!")


          # Unable to init server: Could not connect: Connection refused
          # Unable to init server: Could not connect: Connection refused

          # (news_scrape.py:996012): Gdk-CRITICAL **: 10:06:34.070: gdk_cursor_new_for_display: assertion 'GDK_IS_DISPLAY (display)' failed
          # raceback (most recent call last):
          # File "news_scrape.py", line 158, in <module>
          # response.raise_for_status()
          # File "/usr/lib/python3/dist-packages/requests/models.py", line 940, in raise_for_status
          # raise HTTPError(http_error_msg, response=self)
          # requests.exceptions.HTTPError: 401 Client Error: Access Denied for url: https://api.bing.microsoft.com/v7.0/images/search?q=puppie

          # subscription_key = "94458eda300a418880dd421286e63c2e"
          # search_url = "https://api.bing.microsoft.com/v7.0/images/search"
          # search_term = "puppies"
          # headers = {"Ocp-Apim-Subscription-Key" : subscription_key}
          # params  = {"q": search_term, "license":"public"}
          # time.sleep(1)
          # response = requests.get(search_url, headers=headers, params=params)
          # response.raise_for_status()
          # search_results = response.json()
          #thumbnail_urls = [img["thumbnailUrl"] for img in search_results["value"][:16]]

#           subscriptionKey = '94458eda300a418880dd421286e63c2e'
#           endpoint = 'https://api.bing.microsoft.com'

#           searchTerm = "microsoft"
#             # </importsAndVars>
#           # <url>
# # Add you r Bing Custom Search endpoint to your environment variables.
#           url = endpoint + "/v7.0/images/search?q=" + searchTerm 
#           r = requests.get(url, headers={'Ocp-Apim-Subscription-Key': subscriptionKey})
#           pprint(json.loads(r.text))
          
          api_key = 'AIzaSyDsWGnneLR5-fm9z3S5Tp-lMYqoDV1YpRk'
          search_engine_id = 'e1c5bf1893dd2489d'

# Set the search query
          query = instance_template["attributes"]["OrgLink"]

# Make the API request
          url = f'https://www.googleapis.com/customsearch/v1?key={api_key}&cx={search_engine_id}&q={query}&searchType=image'
          response = requests.get(url)

          if response.status_code == 200:
    # Parse the JSON response
            data = response.json()
    
    # Extract and print image URLs
          if 'items' in data:
            for item in data['items']:
                print(item['link'])
          else:
            print(f"Request failed with status code {response.status_code}")





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





