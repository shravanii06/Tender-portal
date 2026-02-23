from scraper import scrape_tenders, download_pdf   
from ocr import extract_text_from_pdf              
from nlp import generate_summary, extract_keywords, calculate_relevance
from database import save_tender                  


def process_tenders(user_interest=None):
    print("Starting Tender Pipeline...")

    tenders = scrape_tenders()

    for tender in tenders:
        try:
            print(f"Processing: {tender['title']}")

            pdf_path = download_pdf(tender['pdf_url'])

            text = extract_text_from_pdf(pdf_path)

            if not text or len(text.strip()) == 0:
                print("No text extracted, skipping...")
                continue

            summary = generate_summary(text)
            keywords = extract_keywords(text)

            relevance_score = 0
            if user_interest:
                relevance_score = calculate_relevance(text, user_interest)

            save_tender(
                title=tender['title'],
                department=tender.get('department', ''),
                summary=summary,
                keywords=keywords,
                relevance=relevance_score,
                pdf_url=tender['pdf_url']
            )

            print("Saved Successfully")

        except Exception as e:
            print("Error processing tender:", e)

    print("Pipeline Completed")