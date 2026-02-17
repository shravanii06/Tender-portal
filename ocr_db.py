import sqlite3
import os

# Database ka path
db_path = r"C:\Users\shrav\OneDrive\Documents\GitHub\Tender-portal\database\tender.db"

# Folder jahan OCR text files hain
txt_folder = r"C:\Users\shrav\OneDrive\Documents\GitHub\Tender-portal\tenders_pdfs"

# Database connect karo
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Loop through sab txt files
for txt_file in os.listdir(txt_folder):
    if txt_file.endswith(".txt"):
        file_path = os.path.join(txt_folder, txt_file)
        with open(file_path, "r", encoding="utf-8") as f:
            ocr_text = f.read()
        
        # Title ko file name se le lo
        title = txt_file.replace(".txt", "")
        
        # Insert into tenders table (sirf title aur OCR text ke liye)
        cursor.execute("INSERT INTO tenders (title, ocr_text) VALUES (?, ?)", (title, ocr_text))

# Commit aur close
conn.commit()
conn.close()

print("All OCR texts inserted into database!")
