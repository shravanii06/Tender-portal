from services.nlp import generate_summary, extract_keywords, calculate_relevance


sample_text = """
The Public Works Department invites tenders for road construction in Nagpur.
The estimated budget is 5 crore rupees.
Strict deadline and penalty clauses apply.
"""

summary = generate_summary(sample_text)
keywords = extract_keywords(sample_text)
relevance = calculate_relevance(sample_text, "road construction infrastructure")

print("Summary:", summary)
print("Keywords:", keywords)
print("Relevance Score:", round(relevance, 2))

