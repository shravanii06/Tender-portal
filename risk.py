import sqlite3
import re
import os
from datetime import datetime
from services.nlp import generate_summary

# Database path (since risk.py is in root)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "database", "tender.db")

conn = sqlite3.connect(db_path)
cursor = conn.cursor()


def analyze_risk(ocr_text):

    if not ocr_text:
        return "Low"

    risk = "Low"

    # Deadline check
    deadlines = re.findall(r"\d{1,2}/\d{1,2}/\d{4}", ocr_text)

    for d in deadlines:
        try:
            date_obj = datetime.strptime(d, "%d/%m/%Y")
            days_left = (date_obj - datetime.now()).days

            if days_left <= 7:
                return "High"
            elif days_left <= 15:
                risk = "Medium"
        except:
            continue

    # EMD check
    emd_match = re.findall(r"EMD[:\s]*([\d,]+)", ocr_text, flags=re.IGNORECASE)

    for emd in emd_match:
        try:
            emd_num = int(emd.replace(",", ""))
            if emd_num > 500000:
                return "High"
        except:
            continue

    # Penalty keyword check
    if "penalty" in ocr_text.lower():
        return "High"

    return risk


# Fetch tenders
cursor.execute("SELECT id, summary FROM tenders")
rows = cursor.fetchall()

for tender_id, ocr_text in rows:

    summary = generate_summary(ocr_text)
    risk_level = analyze_risk(ocr_text)

    cursor.execute("""
        UPDATE tenders
        SET summary=?, risk_level=?
        WHERE id=?
    """, (summary, risk_level, tender_id))

conn.commit()
conn.close()

print("✅ Summarizer and Risk Analyzer completed!")
