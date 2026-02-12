import sqlite3
import os

current_dir = os.path.dirname(__file__)
db_path = os.path.join(current_dir, "..", "database", "tender.db")

print("DB PATH:", db_path)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS tenders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tender_id TEXT,
    title TEXT,
    department TEXT,
    category TEXT,
    location TEXT,
    deadline TEXT,
    pdf_path TEXT
)
""")

conn.commit()
conn.close()

print("✅ Table 'tenders' created successfully!")
