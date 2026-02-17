import sqlite3

conn = sqlite3.connect("database/tender.db")
cursor = conn.cursor()

cursor.execute("PRAGMA table_info(tenders)")
columns = cursor.fetchall()

print("Actual columns in tenders table:\n")

for col in columns:
    print(col)

conn.close()
