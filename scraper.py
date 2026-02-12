import csv
import os
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

# -------------------------------
# Chrome setup
# -------------------------------
chrome_options = Options()
# chrome_options.add_argument("--headless")  # Uncomment to hide browser
chrome_options.add_argument("--start-maximized")

driver = webdriver.Chrome(options=chrome_options)

# -------------------------------
# URL & PDF folder
# -------------------------------
url = "https://nagpur.gov.in/past-notices/tenders/"
pdf_folder = "tenders_pdfs"
os.makedirs(pdf_folder, exist_ok=True)

# -------------------------------
# CSV setup
# -------------------------------
csv_file = "tenders_output.csv"
with open(csv_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["Title", "Deadline", "PDF Filename", "PDF URL"])

# -------------------------------
# Scraping
# -------------------------------
try:
    print("Opening page...")
    driver.get(url)

    # Wait for table to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "table"))
    )

    table = driver.find_element(By.TAG_NAME, "table")
    rows = table.find_elements(By.TAG_NAME, "tr")

    with open(csv_file, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)

        for row in rows[1:]:  # Skip header
            cols = row.find_elements(By.TAG_NAME, "td")
            if len(cols) >= 5:
                title = cols[1].text.strip()
                deadline = cols[3].text.strip()

                # Skip meetings or empty rows
                if not title or "meeting" in title.lower():
                    continue

                # Get PDF link
                pdf_link = None
                try:
                    link_element = cols[4].find_element(By.TAG_NAME, "a")
                    pdf_link = link_element.get_attribute("href")
                except NoSuchElementException:
                    pdf_link = None

                # Download PDF if link exists
                pdf_filename = ""
                if pdf_link and ".pdf" in pdf_link.lower():
                    safe_name = "".join(c if c.isalnum() or c in " .-_()" else "_" for c in title)
                    pdf_filename = f"{safe_name}.pdf"
                    pdf_path = os.path.join(pdf_folder, pdf_filename)
                    try:
                        headers = {"User-Agent": "Mozilla/5.0"}
                        response = requests.get(pdf_link, headers=headers, timeout=15)
                        if response.status_code == 200:
                            with open(pdf_path, "wb") as pdf_file:
                                pdf_file.write(response.content)
                    except Exception as e:
                        print(f"Error downloading PDF for {title}: {e}")
                        pdf_filename = ""

                # Save to CSV
                writer.writerow([title, deadline, pdf_filename, pdf_link or ""])
                print(f"Saved: {title} | Deadline: {deadline} | PDF: {pdf_filename or 'None'} | URL: {pdf_link or 'None'}")

    print("Finished! Check 'tenders_output.csv' and 'tenders_pdfs' folder.")

except Exception as e:
    print("Error occurred:", e)

finally:
    driver.quit()
