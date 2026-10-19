with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# 1. Locate the end of tiny-reality-scene section
reality_end_tag = '</section>'
pos_reality = text.find('id="tiny-reality-scene"')
pos_reality_end = text.find(reality_end_tag, pos_reality) + len(reality_end_tag)

# 2. Locate where tiny-reality-moon-rover-script starts
pos_rover_script = text.find('<script id="tiny-reality-moon-rover-script">')

print(f"Cutting from pos_reality_end: {pos_reality_end} to pos_rover_script: {pos_rover_script}")

# Add 12A4 ending card/subtext before </section>
ending_enhancement = """
      <p class="reality-sub" style="font-size:clamp(13px,1.6vw,19px);color:#c9edff;text-align:center;margin:12px auto 0;max-width:90vw;letter-spacing:.02em;text-shadow:0 0 14px rgba(115,195,255,.6);line-height:1.5;">
        Chúc toàn thể các bạn nữ 12A4 một ngày 20/10 thật nhiều niềm vui, luôn xinh đẹp rạng rỡ và đạt điểm số cao nhất trong mọi kỳ thi! 🎓💖
      </p>
      <div style="margin-top:20px;display:flex;justify-content:center;pointer-events:auto;position:relative;z-index:10;">
        <button type="button" id="replay-btn" style="background:rgba(255,255,255,0.09);border:1.2px solid rgba(138,229,255,0.45);border-radius:99px;padding:9px 24px;color:#cbf3ff;font-size:13px;letter-spacing:.08em;cursor:pointer;font-family:inherit;box-shadow:0 0 22px rgba(80,180,255,0.28);transition:all .25s ease;" onclick="window.location.reload()">
          ↺ Chạm để xem lại từ đầu
        </button>
      </div>
"""

part1 = text[:pos_reality_end - len(reality_end_tag)] + ending_enhancement + reality_end_tag
part2 = text[pos_rover_script:]

new_text = part1 + "\n" + part2

# 3. Clean up rover script: remove references to shop
new_text = new_text.replace("const shop = document.getElementById('tiny-shop-scene');", "const shop = null;")
new_text = new_text.replace("&& !shop?.classList.contains('shop-visible')", "")

# 4. Remove tiny-shop-magical-script entirely
pos_magical = new_text.find('<script id="tiny-shop-magical-script">')
if pos_magical != -1:
    pos_magical_end = new_text.find('</script>', pos_magical) + len('</script>')
    new_text = new_text[:pos_magical] + new_text[pos_magical_end:]

# 5. Optimize mobile viewport and body touch handling
new_text = new_text.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                            '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">')

# Ensure body has touch-action: manipulation
new_text = new_text.replace('overflow: hidden;',
                            'overflow: hidden; touch-action: manipulation; height: 100vh; height: 100dvh;')

# Ensure text layers have max-width on mobile to never cause overflow
new_text = new_text.replace('.text-layer {',
                            '.text-layer { max-width: 92vw; text-align: center; text-wrap: balance; word-break: break-word; ')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Updated index.html successfully! New size:", len(new_text))
