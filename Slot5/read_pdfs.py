import glob
from pypdf import PdfReader

with open("pdf_content.txt", "w", encoding="utf-8") as f:
    for file_path in ["d:/Ky7_FA2026/SBA301/Slot5/lab1/SBA301_Slot4_Exercise_Guide.pdf", "d:/Ky7_FA2026/SBA301/Slot5/lab1/SBA301_Slot05_Lab.pdf"]:
        f.write(f"\n--- Reading {file_path} ---\n")
        try:
            reader = PdfReader(file_path)
            for i, page in enumerate(reader.pages):
                f.write(f"--- Page {i+1} ---\n")
                f.write(page.extract_text() + "\n")
        except Exception as e:
            f.write(f"Error reading {file_path}: {e}\n")
