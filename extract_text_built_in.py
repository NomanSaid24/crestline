import codecs
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
    def handle_data(self, data):
        if data.strip():
            self.text.append(data.strip())

parser = TextExtractor()
with codecs.open(r"d:\crestlineAfzal\coworkit-exact\cloned-site\index.html", "r", "utf-8") as f:
    parser.feed(f.read())
    
with codecs.open(r"d:\crestlineAfzal\coworkit-exact\extracted_headings.txt", "w", "utf-8") as out:
    for t in parser.text:
        if len(t) > 3:
            out.write(t + "\n")
print("Extraction complete.")
