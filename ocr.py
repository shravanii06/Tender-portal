import os
from pdf2image import convert_from_path
import pytesseract
import cv2
import numpy as np

pdf_folder = r"C:\Users\shrav\OneDrive\Documents\GitHub\Tender-portal\tenders_pdfs"
poppler_path = r"C:\Release-25.12.0-0\poppler-25.12.0\Library\bin"

for pdf_file in os.listdir(pdf_folder):
    if pdf_file.lower().endswith(".pdf"):
        pdf_path = os.path.join(pdf_folder, pdf_file)
        print(f"Processing: {pdf_file}")

        try:
            pages = convert_from_path(pdf_path, dpi=150, poppler_path=poppler_path)
            full_text = ""

            for i, page in enumerate(pages):
                img = np.array(page)
                gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)

                try:
                    text = pytesseract.image_to_string(thresh, lang='hin+eng', timeout=60)
                except RuntimeError:
                    print(f"Page {i+1} took too long, skipping...")
                    text = ""

                full_text += text + "\n"
            txt_file = os.path.join(pdf_folder, pdf_file.replace(".pdf", ".txt"))
            with open(txt_file, "w", encoding="utf-8") as f:
                f.write(full_text)

            print(f"OCR done for {pdf_file}, saved to {txt_file}")

        except Exception as e:
            print(f"Error processing {pdf_file}: {e}")
