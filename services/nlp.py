from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
import re

nltk.download('punkt')
summarizer = pipeline("summarization", model="t5-small")
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')



def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^a-zA-Z0-9.,₹% ]', '', text)
    return text.strip()

def generate_summary(text):
    text = clean_text(text)
    if len(text) > 1000:
        text = text[:1000]

    summary = summarizer(text, max_length=130, min_length=40, do_sample=False)
    return summary[0]['summary_text']


def extract_keywords(text, top_n=5):
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform([text])
    feature_names = vectorizer.get_feature_names_out()
    scores = tfidf_matrix.toarray()[0]

    keywords = sorted(zip(feature_names, scores), key=lambda x: x[1], reverse=True)
    return [word for word, score in keywords[:top_n]]


def calculate_relevance(text, user_interest):
    documents = [text, user_interest]
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    return float(similarity[0][0])
