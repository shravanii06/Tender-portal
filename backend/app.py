from flask import Flask, jsonify, request
import sqlite3
import os

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(BASE_DIR, "../database/tender.db")

def get_all_tenders():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

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
            "urgency_level": row[5]
        }

        tenders.append(tender)

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

if __name__ == "__main__":
    app.run(debug=True)
