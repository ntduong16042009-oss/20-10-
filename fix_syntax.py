with open('/tmp/target_tiny.html', 'r', encoding='utf-8', errors='ignore') as f:
    orig = f.read()

with open('index.html', 'r', encoding='utf-8') as f:
    current = f.read()

import re

# In index.html, unescape any \` to `
current = current.replace('\\`', '`')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(current)

print("Unescaped backticks in index.html!")
