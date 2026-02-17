import sqlite3
import os
from services.nlp import generate_summary, extract_keywords, calculate_relevance


def save_tender(title, text, user_interest):

    summary = generate_summary(text)
    keywords = extract_keywords(text)
    relevance = calculate_relevance(text, user_interest)

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    db_path = os.path.join(BASE_DIR, "database", "tender.db")

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    sql_query = """
    INSERT INTO tenders
    (title, extracted_text, summary, keywords, relevance_score, risk_level)
    VALUES (?, ?, ?, ?, ?, ?)
    """

    values = (
        title,
        text,
        summary,
        ", ".join(keywords),
        relevance,
        "Low"
    )

    cursor.execute(sql_query, values)

    conn.commit()
    conn.close()

    print("✅ Tender saved successfully!")
