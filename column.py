import sqlite3

db_path = r"C:\Users\shrav\OneDrive\Documents\GitHub\Tender-portal\database\tender.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Add new column 'ocr_text' if it doesn't exist
cursor.execute("ALTER TABLE tenders ADD COLUMN ocr_text TEXT")

conn.commit()
conn.close()
print("ocr_text column added successfully!")
