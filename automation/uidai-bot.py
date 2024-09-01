from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import json

# Configure WebDriver
service = Service('./chromedriver')
driver = webdriver.Chrome(service=service)

# Navigate to the mock website
driver.get('http://localhost:3000')  # Adjust as necessary

# Initialize ActionChains
actions = ActionChains(driver)

# Interaction data storage
interaction_data = {
    'mouse_movements': [],
    'keystrokes': [],
    'scrolling_patterns': [],
    'ip_address': ''
}

# Capture mouse movements
mouse_move_script = """
    window.mouseMoves = [];
    document.addEventListener('mousemove', function(event) {
        window.mouseMoves.push({x: event.clientX, y: event.clientY, timestamp: Date.now()});
    });
"""
driver.execute_script(mouse_move_script)

# Simulate interactions
try:
    element = driver.find_element(By.ID, 'aadhaar-number')  # Example element
    actions.move_to_element(element).perform()

    # Simulate keystrokes
    search_box = driver.find_element(By.ID, 'aadhaar-number')
    search_box.click()
    actions.send_keys('123456789012').perform()

    # Simulate OTP entry and submission
    otp_field = driver.find_element(By.ID, 'otp')
    otp_field.send_keys('123456')  # Example OTP

    verify_button = driver.find_element(By.ID, 'verify-download-btn')
    verify_button.click()

    # Capture mouse movement data
    mouse_moves = driver.execute_script("return window.mouseMoves;")
    interaction_data['mouse_movements'] = mouse_moves

    # Get simulated IP address
    interaction_data['ip_address'] = driver.execute_script("return 'Simulated_IP_Address';")

finally:
    # Print interaction data
    print(json.dumps(interaction_data, indent=4))
    driver.quit()