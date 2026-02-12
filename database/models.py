import sqlite3
from backend.config import DATABASE 

def create_table():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
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
    print("Tender table created successfully!")

if __name__ == "__main__":
    create_table()
