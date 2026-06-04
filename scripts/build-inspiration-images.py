"""One-off: inspirations/*.jpg -> img/inspiration/*.webp (max width 1600)."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "inspirations"
DST = ROOT / "img" / "inspiration"
MAX_W = 1600
QUALITY = 82

MAPPING = {
    "PXL_20260404_122715090.jpg": "kastor-koblenz",
    "PXL_20260412_154809601.jpg": "liebfrauen-koblenz",
    "PXL_20260423_085212922.jpg": "dom-trier",
    "PXL_20260501_111114418.jpg": "dom-speyer",
    "PXL_20260506_132929731.jpg": "dom-trier-schiff",
    "PXL_20260514_112328280.jpg": "vysehrad-prag",
    "PXL_20260514_112716786.jpg": "nikolaus-prag",
    "PXL_20260519_112738067.jpg": "veitsdom-prag",
    "PXL_20260519_130141250.jpg": "veitsdom-prag-innen",
    "PXL_20260520_125512358.jpg": "veitsdom-prag-kanzel",
    "PXL_20260520_130337114.jpg": "ludmila-prag",
}

def main():
    DST.mkdir(parents=True, exist_ok=True)
    for src_name, slug in MAPPING.items():
        src = SRC / src_name
        if not src.exists():
            raise SystemExit(f"missing: {src}")
        im = Image.open(src).convert("RGB")
        w, h = im.size
        if w > MAX_W:
            im = im.resize((MAX_W, int(h * MAX_W / w)), Image.Resampling.LANCZOS)
        out = DST / f"{slug}.webp"
        im.save(out, "WEBP", quality=QUALITY, method=6)
        print(out.relative_to(ROOT))

if __name__ == "__main__":
    main()
