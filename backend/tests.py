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

    def test_newsevent_page(self):
        with client:
            # maybe put %20 instead of space
            response = client.get("/news-and-events/Rain of Fire")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json["count"], 1)
            data = response.json["data"]
            self.assertEqual(data["title"], "Rain%20of%20Fire")

    def test_newsevent_page_fail(self):
        with client:
            response = client.get("/news-and-events/NONEXISTINGNEWSEVENT")
            self.assertEqual(response.status_code, 404)


if __name__ == "__main__":
    unittest.main()