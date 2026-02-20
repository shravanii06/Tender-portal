from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options

options = Options()
options.add_argument("--start-maximized")

driver = webdriver.Edge(
    service=Service("msedgedriver.exe"),

)

driver.get("https://www.google.com")



input("Press Enter to close browser...")

driver.quit()
