import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Go back one folder (to project root)
PROJECT_ROOT = os.path.dirname(BASE_DIR)

db_path = os.path.join(PROJECT_ROOT, "backend", "database", "tender.db")

print("Checking DB at:", db_path)

if not os.path.exists(db_path):
    print("❌ Database file does NOT exist at this path!")
    exit()

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print("Tables:", cursor.fetchall())

cursor.execute("SELECT * FROM tenders;")
rows = cursor.fetchall()

if rows:
    print("Rows in tenders table:")
    for row in rows:
        print(row)
else:
    print("⚠️ No data found in tenders table!")

conn.close()