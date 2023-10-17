import requests
import json
import time
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv
load_dotenv(dotenv_path="../../secrets.env")

# Function to retrieve/populate the channel IDs for each charity/organization
def scrape_youtube_channel_ids(charity_db_path):
  with open(charity_db_path, "r") as f:
    charity_db = json.load(f)
  # Iterate through each charity/organization
  count = 0
  charity_num = 1
  for charity in charity_db:
    # Define template to store youtube information
    youtube_info = {
      "channel_id": "",
      "channel_url": "",
      "relevant_videos": []
    }
    # Retrieve youtube channel url
    youtube_url = charity["attributes"]["youtube_channel"]
    youtube_info["channel_url"] = youtube_url
    # Retrieve youtube channel html
    response = requests.get(youtube_url)
    # Verify that the response is valid
    if response.status_code == 200:
      # Create the soup
      soup = BeautifulSoup(response.content, "html.parser")
      # Extract the channel ID
      channel_link = soup.find("link", {"rel": "canonical"})
      channel_id = channel_link["href"].split("/")[-1]
      youtube_info["channel_id"] = channel_id
      count += 1
    else:
      print(f"Failed to scrape youtube channel ID for {charity['name']}")
      return
    charity_num += 1
    # Add youtube_info to charity information
    charity["attributes"]["youtube_info"] = youtube_info
    # Remove old youtube_url field
    del charity["attributes"]["youtube_channel"]
    # Print Status
    print(f"Scraped youtube channel ID for {charity['name']}...{charity_num}/{len(charity_db)}")
    time.sleep(5)
  # Write updated charity info to json file
  with open(charity_db_path, "w") as f:
    json.dump(charity_db, f, indent=2)
    

# Function to retrieve/populate the relevant videos (Video IDs) for each charity/organization
def retrieve_videos(charity_db_path):
  # Define necessary variables for API request
  YOUTUBE_URL = "https://youtube.googleapis.com/youtube/v3/search"
  KEY = os.environ["GOOGLE_API"]
  # Load charity instances into list
  with open(charity_db_path, "r") as f:
    charity_db = json.load(f)
  # Iterate through each charity/organization
  count = 0
  charity_num = 0
  for charity in charity_db:
    # Define API query parameters
    params = {
      "part": "id",
      "channelId": charity["attributes"]["youtube_info"]["channel_id"],
      "order": "relevance",
      "q": "syrian refugees",
      "type": "video",
      "videoEmbeddable": "true",
      "maxResults": 5,
      "key": KEY
    }
    # Make request to API
    response = requests.get(YOUTUBE_URL, params=params)
    # Verify that the response is valid
    if response.status_code == 200 and len(response.json()["items"]) > 0:
      # Extract video IDs from response and store in charity instance
      video_ids = []
      for video in response.json()["items"]:
        video_ids.append(video["id"]["videoId"])
      charity["attributes"]["youtube_info"]["relevant_videos"] = video_ids
      count += 1
    else:
      print(f"Failed to retrieve relevant videos for {charity['name']}")
    charity_num += 1
    # Print Status
    print(f"Retrieved relevant videos for {charity['name']}...{charity_num}/{len(charity_db)}")
    time.sleep(1)
  print(f"Retrieved relevant videos for {count}/{len(charity_db)} charities/organizations")
  # Write updated charity info to json file
  with open(charity_db_path, "w") as f:
    json.dump(charity_db, f, indent=2)
    
retrieve_videos("models_data/charity_db.json")