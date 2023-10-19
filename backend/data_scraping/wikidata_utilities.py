# Import necessary packages
import requests

# Define necessary variables
URL = "https://www.wikidata.org/w/api.php"

# Define necessary functions to parse/fetch data from Wikidata

# Returns page ID of the Wikidata page from a string name
def get_page_id(name):
  params = {
    "action": "wbsearchentities",
    "format": "json",
    "search": name,
    "language": "en",
  }
  ret = ""
  try:
    response = requests.get(URL, params=params)
    ret = response.json()["search"][0]["id"]
  except:
    print("Request for page ID failed")
    ret = ""
  return ret

# Returns string title of Wikidata page from page ID
def get_page_title(page_id):
  params = {
    "action": "wbgetentities",
    "format": "json",
    "ids": page_id,
    "props": "labels",
    "languages": "en",
  }
  ret = ""
  try:
    response = requests.get(URL, params=params)
    ret = response.json()["entities"][page_id]["labels"]["en"]["value"]
  except:
    print("Request for page title failed")
    ret = ""
  return ret
  
# Return the json object of data relating to the Wikidata page
def get_page_data(page_id):
  params = {
    "action": "wbgetentities",
    "ids": f"{page_id}",
    "format": "json",
    "languages": "en",
  }
  try:
    response = requests.get(URL, params=params)
  except:
    print("Request for page data failed")
  return response.json()

# Return the URL of an image from a file name
def get_img_url(file_name):
  params = {
    "action": "query",
    "titles": f"File:{file_name.replace(' ', '_')}",
    "prop": "imageinfo",
    "iiprop": "url",
    "format": "json",
  }
  ret = ""
  try:
    # Search for image using Wikipedia image API
    response = requests.get("https://en.wikipedia.org/w/api.php", params=params)
    page_id = list(response.json()["query"]["pages"].keys())[0]
    ret = response.json()["query"]["pages"][page_id]["imageinfo"][0]["url"]
  except:
    print("Request for image URL failed")
    ret = ""
  return ret
