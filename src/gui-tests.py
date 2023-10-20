from selenium import webdriver
from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
# from selenium.webdriver import Remote
# from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.support.select import Select
import unittest
import time

URL = "https://www.syrianrefugeecrisis.me/"

class Test(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        chrome_options = Options()
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("disable-infobars")
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--headless")
        self.driver = webdriver.Chrome(chrome_options=chrome_options)
        self.driver.get(URL)

    @classmethod
    def tearDownClass(self):
        self.driver.quit()
        
    def test_home_carousel(self):
        self.driver.get(URL)
        time.sleep(2)
        try:
            home_carousel = self.driver.find_element_by_css_selector('carousel-inner')
        except Exception as e:
            print("Home Carousel not found on home page" + str(e))
        self.assertTrue(home_carousel.is_displayed())
    
    def test_home_title(self):
        try:
            title_button = self.driver.find_elements(By.CLASS_NAME, "active navbar-brand")
            title_button.click()
        except Exception as ex:
            print("Website title button not found: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL)
    
    def test_home_button(self):
        self.driver.get(URL)
        time.sleep(2)
        try:
            elements = self.driver.find_elements(By.CLASS_NAME, "nav-link")
            elements[0].click()
        except Exception as e:
            print("Home button not found on home page" + str(e))
        self.assertEqual(str(self.driver.current_url), URL)
        
    def test_about_button(self):
        try:
            elements = self.driver.find_elements(By.CLASS_NAME, "nav-link")
            elements[1].click()
        except Exception as ex:
            print("About button not found on home page: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL + "about")
            
    def test_home_carousel_next(self):
        try:
            next_button = self.driver.find_elements(By.CLASS_NAME, "carousel-control-next-icon")
            next_button.click()
        except Exception as ex:
            print("Carousel next button not found: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL)
            
    def test_navbar_dropdown(self):
        try:
            dropdown = self.driver.find_elements(By.CLASS_NAME, "nav-item dropdown")
            dropdown.click()
        except Exception as ex:
            print("Dropdown not found: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL)
        
    def test_charities_dropdown_item(self):
        try:
            elements = self.driver.find_elements(By.CLASS_NAME, "dropdown-item")
            elements[0].click()
        except Exception as ex:
            print("Charities dropdown item not found: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL + "charities")
    
    def test_countries_dropdown_item(self):
        try:
            elements = self.driver.find_elements(By.CLASS_NAME, "dropdown-item")
            elements[1].click()
        except Exception as ex:
            print("Countries dropdown not found: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL + "countries")
    
    def test_newsevents_dropdown_item(self):
        try:
            elements = self.driver.find_elements(By.CLASS_NAME, "dropdown-item")
            elements[2].click()
        except Exception as ex:
            print("News/Events dropdown not found: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL + "news-and-events")
        
    def test_carousel_indicators(self):
        try:
            indicators = self.driver.find_element_by_css_selector('carousel-indicators')
        except Exception as e:
            print("Carousel Indicators not found on home page" + str(e))
        self.assertTrue(indicators.is_displayed())

if __name__ == "__main__":
    unittest.main()
