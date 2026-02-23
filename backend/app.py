from flask_cors import CORS
from flask import Flask, jsonify, request
import sqlite3
import os

app = Flask(__name__)
CORS(app)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(BASE_DIR, "../database/tender.db")

def get_all_tenders():
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("PRAGMA table_info(tenders);")
    print("TABLE STRUCTURE:", cursor.fetchall())

    cursor.execute("SELECT * FROM tenders")
    rows = cursor.fetchall()

    tenders = []

    for row in rows:
        tender = {
            "id": row[0],
            "title": row[1],
            "department": row[2],
            "deadline": row[3],
            "pdf_link": row[4],
            "urgency_level": row[5],
            "apply_url": row[6] 
        }

        tenders.append(tender)

    conn.close()
    return tenders


    conn.close()
    return tenders


@app.route("/")
def home():
    return "Backend is working!"

@app.route("/tenders", methods=["GET"])
def tenders():
    return jsonify(get_all_tenders())

@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q", "")
    all_tenders = get_all_tenders()
    filtered = [t for t in all_tenders if query.lower() in t["title"].lower()]
    return jsonify(filtered)
@app.route("/api/test")
def test():
    return {"message": "Backend Connected Successfully"}
@app.route("/api/tenders")
def get_tenders():
    return [
        {
            "title": "Government AI Analytics Project",
            "matchScore": 94,
            "insight": "Strong AI expertise match.",
            "deadline": "Mar 30, 2026",
            "department": "Ministry of IT",
            "value": "$1.5M"
        },
        {
            "title": "Cyber Security Infrastructure Upgrade",
            "matchScore": 90,
            "insight": "High compatibility with certifications.",
            "deadline": "Apr 12, 2026",
            "department": "National Security",
            "value": "$2.1M"
        }
    ]


if __name__ == "__main__":
    app.run(debug=True)
