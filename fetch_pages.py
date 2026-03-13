import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    "index": "https://demo.coworkit.co/",
    "about": "https://demo.coworkit.co/about",
    "features": "https://demo.coworkit.co/features",
    "pricing": "https://demo.coworkit.co/pricing",
    "addons": "https://demo.coworkit.co/addons",
    "contact": "https://demo.coworkit.co/contact-us"
}

import time
for name, url in urls.items():
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        print(f"Fetching {url}...")
        with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
            html = response.read().decode('utf-8')
            with open(f"d:\\crestlineAfzal\\coworkit-exact\\cloned-site\\fetched_{name}.html", 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"Saved {name}!")
    except Exception as e:
        print(f"Failed {name}: {e}")
    time.sleep(1)
