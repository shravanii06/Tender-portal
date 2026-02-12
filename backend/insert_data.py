import sqlite3
import os

current_dir = os.path.dirname(__file__)
db_path = os.path.join(current_dir, "..", "database", "tender.db")

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("""
INSERT INTO tenders (tender_id, title, department, category, location, deadline, pdf_path)
VALUES 
('T001', 'Road Construction Project', 'PWD', 'Infrastructure', 'Nagpur', '2026-03-10', 'pdfs/road.pdf'),
('T002', 'School Building Tender', 'Education Dept', 'Construction', 'Mumbai', '2026-03-15', 'pdfs/school.pdf')
""")

conn.commit()
conn.close()

print("✅ Sample tenders inserted!")
