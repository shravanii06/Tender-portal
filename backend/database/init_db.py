import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
db_path = os.path.join(BASE_DIR, "database", "tender.db")

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("DROP TABLE IF EXISTS tenders")

cursor.execute("""
CREATE TABLE tenders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    extracted_text TEXT,
    summary TEXT,
    keywords TEXT,
    relevance_score REAL,
    risk_level TEXT
)
""")

conn.commit()
conn.close()

print("✅ Final database structure created!")
