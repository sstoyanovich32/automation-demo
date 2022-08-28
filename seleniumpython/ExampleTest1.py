from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
timeout = 10 

# Goto the web site we want
driver.get("https://restaurantinfo.com")

try:
  WebDriverWait(driver, timeout).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, ".bg-fixed.bg-top img[src = 'https://restaurantinfo.com/images/logo/logo-desktop.png']"))
  )
except Exception as e:
  print("Cannot find 'logo-desktop.png'!!!")
  driver.quit()

searchTerm = "Chef"
driver.find_element(By.CSS_SELECTOR, ".ais-Autocomplete input").send_keys(searchTerm)

firstMatchingSuggestionCSS = "*[id = autosuggest] ul > li .py-2 .text-xl.mx-4.cursor-pointer"

# Verify autocomplete is displayed
try:
  WebDriverWait(driver, timeout).until(
    EC.text_to_be_present_in_element((By.CSS_SELECTOR, firstMatchingSuggestionCSS), searchTerm)
  )
except Exception as e:
  print("Cannot find 'Chef' in autocomplete!!!")
  driver.quit()

# Click on first matching suggestion
driver.find_element(By.CSS_SELECTOR, firstMatchingSuggestionCSS).click()

driver.find_element(By.CSS_SELECTOR, "*[id = autosuggest] > input[name = 'city_state']").send_keys("New York")
try:
  WebDriverWait(driver, timeout).until(
    EC.text_to_be_present_in_element((By.CSS_SELECTOR, ".autosuggest__results-item span.text-xl"), "New York, NY, USA")
  )
except Exception as e:
  print("Cannot find 'New York, NY, USA' in autocomplete!!!")
  driver.quit()

# Click on entry New York, NY, USA
driver.find_element(By.CSS_SELECTOR, firstMatchingSuggestionCSS).click();

# Search
driver.find_element(By.XPATH, ".//button//*[text() = 'Search']").click();

# Verify result page is shown with 'New York, NY, USA' under Location
try:
  WebDriverWait(driver, timeout).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, ".ais-RefinementList input[value = 'New York, NY, USA']"))
  )
except Exception as e:
  print("Cannot find 'New York, NY, USA' under Location on result page!!!")
  driver.quit()


driver.quit()

