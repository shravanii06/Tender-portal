import sqlite3
import os

current_dir = os.path.dirname(__file__)
db_path = os.path.join(current_dir, "..", "database", "tender.db")

conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("""
INSERT INTO tenders 
(title, department, deadline, pdf_link, extracted_text, summary, relevance_score, urgency_level)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
""", (
    'Road Construction Project',
    'PWD',
    '2026-03-10',
    'pdfs/road.pdf',
    '',            
    '',            
    0.0,          
    'Medium'       
))

cursor.execute("""
INSERT INTO tenders 
(title, department, deadline, pdf_link, extracted_text, summary, relevance_score, urgency_level)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
""", (
    'School Building Tender',
    'Education Dept',
    '2026-03-15',
    'pdfs/school.pdf',
    '',
    '',
    0.0,
    'High'
))
conn.commit()
conn.close()

print("✅ Sample tenders inserted successfully!")
