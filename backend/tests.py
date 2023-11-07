from application import flaskApp
import unittest

flaskApp.config["TESTING"]
client = flaskApp.test_client()

class Tests(unittest.TestCase):
    # Charities endpoints tests
    def test_charities_page(self):
        with client:
            response = client.get("/charities")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 48)
            self.assertEqual(len(response.json["data"]), 48)

    def test_charities_page_paginization(self):
        with client:
            response = client.get("/charities?page=1")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 12)
            self.assertEqual(len(response.json["data"]), 12)

    def test_charities_page_searchQuery(self):
        with client:
            response = client.get("/charities?searchQuery=Children")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 16)
            self.assertEqual(len(response.json["data"]), 16)

    def test_charites_page_sortBy(self):
        with client:
            response = client.get("/charities?sortOrder=asc&sortBy=yearEstablished")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 48)
            self.assertEqual(len(response.json["data"]), 48)
            self.assertEqual(response.json["data"][0]["established"], "1897-01-01T00:00:00Z")

    def test_charities_page_reliefTypes(self):
        with client:
            response = client.get("/charities?reliefTypes=[\"Education\"]")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 22)
            self.assertEqual(len(response.json["data"]), 22)
            self.assertTrue("Education" in response.json["data"][0]["relief_provided"])

    def test_charities_page_hqCountry(self):
        with client:
            response = client.get("/charities?hqCountry=[\"Switzerland\"]")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 10)
            self.assertEqual(len(response.json["data"]), 10)
            self.assertEqual(response.json["data"][0]["hq_country"], "Switzerland")

    def test_charities_page_orgType(self):
        with client:
            response = client.get("/charities?orgType=[\"International Organization\"]")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 12)
            self.assertEqual(len(response.json["data"]), 12)
            self.assertTrue("International Organization" in response.json["data"][0]["org_type"])

    def test_charity_page(self):
        with client:
            response = client.get("/charities/Medair")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 1)
            data = response.json["data"]
            self.assertEqual(data["name"], "Medair")

    def test_charity_page_fail(self):
        with client:
            response = client.get("/charities/NONEXISTINGCHARITY")
            self.assertEqual(response.status_code, 404)

    # Countries endpoints tests
    def test_countries_page(self):
        with client:
            response = client.get("/countries")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 127)
            self.assertEqual(len(response.json["data"]), 127)

    def test_countries_page_paginization(self):
        with client:
            response = client.get("/countries?page=1")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 12)
            self.assertEqual(len(response.json["data"]), 12)

    def test_countries_page_searchQuery(self):
        with client:
            response = client.get("/countries?searchQuery=Children")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 38)
            self.assertEqual(len(response.json["data"]), 38)

    def test_countries_page_sortBy(self):
        with client:
            response = client.get("/countries?sortOrder=desc&sortBy=totalRefugees")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 127)
            self.assertEqual(len(response.json["data"]), 127)
            self.assertEqual(response.json["data"][0]["num_refugees"], 13000000)

    def test_countries_page_year(self):
        with client:
            response = client.get("/countries?year=[2020]")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 9)
            self.assertEqual(len(response.json["data"]), 9)
            self.assertEqual(response.json["data"][0]["year_of_decisions"], 2020)

    def test_countries_page_numRefugees(self):
        with client:
            response = client.get("/countries?numRefugees=[10000]")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 21)
            self.assertEqual(len(response.json["data"]), 21)
            self.assertTrue(response.json["data"][0]["num_refugees"] > 10000)

    def test_country_page(self):
        with client:
            response = client.get("/countries/Germany")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 1)
            data = response.json["data"]
            self.assertEqual(data["name"], "Germany")

    def test_country_page_fail(self):
        with client:
            response = client.get("/countries/NONEXISTINGCOUNTRY")
            self.assertEqual(response.status_code, 404)

    # NewsEvents endpoints tests
    def test_newsevents_page(self):
        with client:
            response = client.get("/news-and-events")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 75)
            self.assertEqual(len(response.json["data"]), 75)

    def test_newsevents_page_paginization(self):
        with client:
            response = client.get("/news-and-events?page=1")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 12)
            self.assertEqual(len(response.json["data"]), 12)

    def test_newsevents_page_searchQuery(self):
        with client:
            response = client.get("/news-and-events?searchQuery=Children")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 24)
            self.assertEqual(len(response.json["data"]), 24)

    def test_newsevents_page_sortBy(self):
        with client:
            response = cient.get("/news-and-events?sortOrder=asc&sortBy=date")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 75)
            self.assertEqual(len(response.json["data"]), 75)
            self.assertEqual(response.json["data"][0]["date"], "2009-09-28T04:00:00+00:00")

    def test_newsevents_page_location(self):
        with client:
            response = client.get("/news-and-events?location=[\"Myanmar\"]")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 1)
            self.assertEqual(len(response.json["data"]), 1)
            self.assertEqual(response.json["data"][0]["primary_country"], "Myanmar")

    def test_newsevents_page_source(self):
        with client:
            response = client.get("/news-and-events?source=[\"Amnesty\"]")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 6)
            self.assertEqual(len(response.json["data"]), 6)

    def test_newsevents_page_theme(self):
        with client:
            response = client.get("/news-and-events?theme=[\"Health\"]")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 8)
            self.assertEqual(len(response.json["data"]), 8)
            self.assertTrue("Health" in response.json["data"][0]["themes"])

    def test_newsevents_page_disasterType(self):
        with client:
            response = client.get("/news-and-events?disasterType=[\"Epidemic\"]")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 9)
            self.assertEqual(len(response.json["data"]), 9)
            self.assertTrue("Epidemic" in response.json["data"][0]["disaster_type"])

    def test_newsevent_page(self):
        with client:
            # maybe put %20 instead of space
            response = client.get("/news-and-events/Rain of Fire")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 1)
            data = response.json["data"]
            self.assertEqual(data["title"], "Rain of Fire")

    def test_newsevent_page_fail(self):
        with client:
            response = client.get("/news-and-events/NONEXISTINGNEWSEVENT")
            self.assertEqual(response.status_code, 404)


if __name__ == "__main__":
    unittest.main()