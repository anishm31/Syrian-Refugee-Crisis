#path to chromedriver VSCode /u/shadow/CS373/API-proj/syrian_refugee_crisis/chrome-mac-x64
#./syrian_refugee_crisis/chrome-mac-x64

import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver import ActionChains


# Create a new instance of the Chrome driver

url = "https://www.syrianrefugeecrisis.me/"

@classmethod
class SeleniumTests(unittest.TestCase):

    def setUpClass(self):
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1440, 900")
        chrome_prefs = {}
        options.experimental_options["prefs"] = chrome_prefs
        self.driver = webdriver.Chrome(options = options, service = Service(ChromeDriverManager().install()))
        self.driver.get(url)

    
    @classmethod
    def tearDownClass(self):
        self.driver.quit()
        
    @classmethod
    def ensureCanClick(self, elementCSS):
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, elementCSS))
        )
        return WebDriverWait(self.driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, elementCSS))
        )

    # Test 1
    def test_a (self):
        # Navigate to About
        title = self.driver.title
        self.assertEqual(title, "MusicMap")


    # Test 1
    def test_b (self):
        # Navigate to About
        self.driver.get(url)
        button = self.driver.find_element(By.XPATH, "//*[@id='root']/div/div[1]/div[2]/ul/li[2]/a")
        button.click()
        self.assertEqual(self.driver.current_url, url + "about")


if __name__ == "__main__":
    unittest.main()