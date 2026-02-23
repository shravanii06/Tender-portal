import sqlite3
import os
import csv
import requests
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException 
def get_urgency(deadline):
    try:
        closing = datetime.strptime(deadline, "%d/%m/%Y")
        days_left = (closing - datetime.now()).days

        if days_left <= 3:
            return "HIGH"
        elif days_left <= 7:
            return "MEDIUM"
        else:
            return "LOW"
    except:
        return "UNKNOWN"

chrome_options = Options()
chrome_options.add_argument("--start-maximized")

service = Service("msedgedriver.exe")
driver = webdriver.Edge(service=service, options=chrome_options)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(BASE_DIR, "backend", "database", "tender.db")

conn = sqlite3.connect(DATABASE)
cursor = conn.cursor()

url = "https://nagpur.gov.in/past-notices/tenders/"
pdf_folder = "tenders_pdfs"
os.makedirs(pdf_folder, exist_ok=True)

csv_file = "tenders_output.csv"
with open(csv_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["Title", "Deadline", "PDF Filename", "PDF URL"])


try:
    print("Opening page...")
    driver.get(url)

    rows = driver.find_elements(By.TAG_NAME, "tr")

    with open(csv_file, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)


        for row in rows[1:]: 
            cols = row.find_elements(By.TAG_NAME, "td")
            if len(cols) >= 5:
                title = cols[1].text.strip()
                deadline = cols[3].text.strip()

                if not title or "meeting" in title.lower():
                    continue

                pdf_link = None
                try:
                    link_element = cols[4].find_element(By.TAG_NAME, "a")
                    pdf_link = link_element.get_attribute("href")
                except NoSuchElementException:
                    pdf_link = None

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
                        
                writer.writerow([title, deadline, pdf_filename, pdf_link or ""])
                cursor.execute("SELECT id FROM tenders WHERE title = ?", (title,))
                existing = cursor.fetchone()

                if existing:
                   continue
                urgency = get_urgency(deadline)

                cursor.execute("""
                INSERT INTO tenders 
                (title, department, deadline, pdf_link, urgency_level, apply_url)
                VALUES (?, ?, ?, ?, ?, ?)
                """, (
                    title,
                    "Nagpur Municipal Corporation",
                    deadline,
                    pdf_link or "",
                    urgency,
                    pdf_link or ""
                ))


                conn.commit()
                print(f"Saved: {title} | Deadline: {deadline} | PDF: {pdf_filename or 'None'} | URL: {pdf_link or 'None'}")

    print("Finished! Check 'tenders_output.csv' and 'tenders_pdfs' folder.")

except Exception as e:
    print("Error occurred:", e)

finally:
    conn.close()
    driver.quit()
