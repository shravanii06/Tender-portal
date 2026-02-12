import sqlite3

# Connect to database (create if it doesn't exist)
conn = sqlite3.connect('../database/tender.db')
cursor = conn.cursor()

# Create table for tenders
cursor.execute('''
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
''')

conn.commit()
conn.close()
print("Database created successfully!")
