from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
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
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.get(URL)

    @classmethod
    def tearDownClass(self):
        self.driver.quit()
        
    def test_home_carousel(self):
        self.driver.get(URL)
        time.sleep(2)
        try:
            self.driver.find_element(By.CLASS_NAME, "carousel-inner")
        except Exception as e:
            print("Home Carousel not found on home page" + str(e))
        self.assertTrue(str(self.driver.current_url), URL)
    
    def test_home_title(self):
        try:
            WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable(
                (By.XPATH, '//*[@id="root"]/nav/div/a[1]')
            ))
            home = self.driver.find_element(By.XPATH, '//*[@id="root"]/nav/div/a[1]')
            home.click()
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
            next_button = self.driver.find_element(By.CLASS_NAME, "carousel-control-next-icon")
            next_button.click()
        except Exception as ex:
            print("Carousel next button not found: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL)
        
    def test_home_carousel_prev(self):
        try:
            prev_button = self.driver.find_element(By.CLASS_NAME, "carousel-control-prev-icon")
            prev_button.click()
        except Exception as ex:
            print("Carousel prev button not found: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL)
            
    def test_navbar_dropdown(self):
        try:
            dropdown = self.driver.find_element(By.ID, "basic-nav-dropdown")
            dropdown.click()
        except Exception as ex:
            print("Dropdown not found: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL)
    
    def test_charities_dropdown_item(self):
        try:
            dropdown = self.driver.find_element(By.ID, "basic-nav-dropdown")
            dropdown.click()
            elements = self.driver.find_elements(By.CLASS_NAME, "dropdown-item")
            elements[0].click()
        except Exception as ex:
            print("Charities dropdown item not found: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL + "charities")
    
    def test_countries_dropdown_item(self):
        try:
            dropdown = self.driver.find_element(By.ID, "basic-nav-dropdown")
            dropdown.click()
            elements = self.driver.find_elements(By.CLASS_NAME, "dropdown-item")
            elements[1].click()
        except Exception as ex:
            print("Countries dropdown not found: " + str(ex))
        self.assertEqual(str(self.driver.current_url), URL + "countries")
    
    def test_carousel_indicators(self):
        try:
            WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable(
                (By.XPATH, '//*[@id="root"]/div/div/div[1]')
            ))
        except Exception as e:
            print("Carousel Indicators not found on home page" + str(e))
        self.assertTrue(str(self.driver.current_url), URL)

if __name__ == "__main__":
    unittest.main()