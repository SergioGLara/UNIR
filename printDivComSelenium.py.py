from select import select
import selectors
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.keys import Keys
import time

servico = Service(ChromeDriverManager().install())

driver = webdriver.Chrome(service=servico)

driver.get('https://www.geeksforgeeks.org/screenshot-element-method-selenium-python/')

divInteresse = driver.find_element(By.TAG_NAME, "pre")
divInteresse.screenshot("Print_do_elemento.png")
driver.close