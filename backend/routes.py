from flask import Blueprint, jsonify, request
import sqlite3
from config import DATABASE

routes = Blueprint('routes', __name__)

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

@routes.route('/tenders', methods=['GET'])
def tenders():
    return jsonify(get_all_tenders())

@routes.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    all_tenders = get_all_tenders()
    filtered = [t for t in all_tenders if query.lower() in t['title'].lower()]
    return jsonify(filtered)
