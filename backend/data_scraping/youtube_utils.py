import requests
import json
import time
from bs4 import BeautifulSoup

# Function to retrieve the channel IDs for each charity/organization
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
    

scrape_youtube_channel_ids("models_data/charity_db.json")