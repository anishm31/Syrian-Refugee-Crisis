import requests

URL = "https://api.reliefweb.int/v1/reports"

# Function used to determine relevant countries that connect to a given charity/organization
def get_relevant_countries(charity, charity_id):
  # Define API parameters
  params = {
    "appname" : "syrianrefugeecrisis",
    "query[value]" : "syrian refugees",
    "profile" : "full",
    "filter[field]" : "source.id",
    "filter[value]" : charity_id,
    "fields[include][]" : "country",
    "limit" : 200
  }
  # Define template to store relevant countries
  relevant_countries = {
    "primary_countries" : set(),
    "secondary_countries" : set()
  }
  # Make request to retrieve documents/reports pertaining to the query
  response = requests.get(URL, params=params)
  # Verify status of response
  if response.status_code == 200 and response.json()["count"] > 0:
    # Parse relevant countries from response of documents/reports and store
    for report in response.json()["data"]:
      # Add all countries to list (if present)
      if report["fields"].get("country") is not None:
        for country in report["fields"]["country"]:
          country_name = country["name"]
          country_iso3 = country["iso3"]
          if country_name != "World":
            # Determine if current country is the primary country for the report
            if country.get("primary") == True:
              relevant_countries["primary_countries"].add(country_iso3.upper())
            else:
              relevant_countries["secondary_countries"].add(country_iso3.upper())
    # Remove duplicates sets
    relevant_countries["secondary_countries"] = relevant_countries["secondary_countries"].difference(relevant_countries["primary_countries"])
  elif response.json()["count"] == 0:
    # Default to Syria being the relevant country if no documents/reports are found
    relevant_countries["primary_countries"].add("SYR")
  else:
    print(f"Request for relevant countries for {charity} failed: {response.status_code}")
    return []
  
  # Convert fields of relevant_countries to lists and return
  relevant_countries["primary_countries"] = list(relevant_countries["primary_countries"])
  relevant_countries["secondary_countries"] = list(relevant_countries["secondary_countries"])
  return relevant_countries
