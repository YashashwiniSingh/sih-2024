from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import time
import json

# Configure the WebDriver (use the appropriate driver for your browser)
service = Service('./chromedriver-win64/chromedriver.exe')
driver = webdriver.Chrome(service=service)

# Navigate to the UIDAI website
driver.get('https://uidai-new.vercel.app')

# Initialize ActionChains for capturing mouse movements and keystrokes
actions = ActionChains(driver)

# Initialize interaction data storage
interaction_data = {
    'mouse_movements': [],
    'keystrokes': [],
    'scrolling_patterns': [],
    'ip_address': ''
}

# JavaScript code to capture mouse movements and store them in a global array
mouse_move_script = """
    window.mouseMoves = [];
    document.addEventListener('mousemove', function(event) {
        window.mouseMoves.push({x: event.clientX, y: event.clientY, timestamp: Date.now()});
    });
"""

# Execute the script to start capturing mouse movements
driver.execute_script(mouse_move_script)

# Simulate some interactions to collect data
try:
    # Simulate mouse movement by moving to a certain element (this is just a demonstration)
    element = driver.find_element_by_tag_name('body')  # Example element
    actions.move_to_element(element).perform()

    # Simulate keystrokes
    search_box = driver.find_element_by_name('search')  # Change this selector based on the actual page
    search_box.click()
    actions.send_keys('Aadhaar').perform()

    # Capture scrolling
    last_scroll_position = driver.execute_script("return window.pageYOffset;")
    for _ in range(3):  # Simulate some scrolling
        driver.execute_script("window.scrollBy(0, 100);")
        time.sleep(1)
        current_scroll_position = driver.execute_script("return window.pageYOffset;")
        interaction_data['scrolling_patterns'].append({
            'scroll_position': current_scroll_position,
            'timestamp': time.time()
        })

    # Retrieve mouse movement data
    mouse_moves = driver.execute_script("return window.mouseMoves;")
    interaction_data['mouse_movements'] = mouse_moves

    # Get IP address (this requires server-side support, but simulated here for demo)
    interaction_data['ip_address'] = driver.execute_script(
        "return 'Simulated_IP_Address';"
    )

finally:
    # Print collected data
    print(json.dumps(interaction_data, indent=4))

    # Close the browser
    driver.quit()