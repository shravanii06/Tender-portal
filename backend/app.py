from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

DATABASE = '../database/tender.db'

def get_all_tenders():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tenders")
    rows = cursor.fetchall()
    conn.close()
    
    tenders = []
    for row in rows:
        tenders.append({
            'id': row[0],
            'tender_id': row[1],
            'title': row[2],
            'department': row[3],
            'category': row[4],
            'location': row[5],
            'deadline': row[6],
            'pdf_path': row[7]
        })
    return tenders

@app.route("/")
def home():
    return "Backend is working!"

@app.route('/tenders', methods=['GET'])
def tenders():
    return jsonify(get_all_tenders())

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    all_tenders = get_all_tenders()
    filtered = [t for t in all_tenders if query.lower() in t['title'].lower()]
    return jsonify(filtered)

if __name__ == "__main__":
    app.run(debug=True)
