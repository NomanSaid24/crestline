import os
from bs4 import BeautifulSoup
import json

html_file = r"d:\crestlineAfzal\coworkit-exact\cloned-site\index.html"
with open(html_file, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

headings = []
for tag in ['h1', 'h2', 'h3', 'p']:
    for el in soup.find_all(tag):
        text = el.get_text(strip=True)
        if len(text) > 0 and len(text) < 200:
            headings.append(f"{tag.upper()}: {text}")
        elif len(text) >= 200:
            headings.append(f"{tag.upper()} (LONG): {text[:100]}...")

with open(r"d:\crestlineAfzal\coworkit-exact\extracted_headings.txt", "w", encoding="utf-8") as out:
    out.write("\n".join(headings))

print("Extraction complete. Found", len(headings), "elements. Run view_file on extracted_headings.txt")
