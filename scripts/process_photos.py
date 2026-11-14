import os
from PIL import Image, ImageEnhance, ImageFilter

src_base = r'C:\Users\ASUS\.gemini\antigravity\brain\c55689a2-feaa-411d-8ebd-9d8a4ee1ee5e\.user_uploaded'
out_dir = r'c:\Users\ASUS\bdwebsite\public\photos'
os.makedirs(out_dir, exist_ok=True)

photo_specs = [
    {
        'file': 'media_1794595365060_227d97cd.jpg',
        'out': 'photo1.jpg',
        'brightness': 1.03,
        'contrast': 1.06,
        'color': 1.08,
        'sharpness': 1.08,
        'clean_watermark': True
    },
    {
        'file': 'media_1794595365093_870567b8.jpg',
        'out': 'photo2.jpg',
        'brightness': 1.02,
        'contrast': 1.05,
        'color': 1.08,
        'sharpness': 1.05
    },
    {
        'file': 'media_1794595365092_a948966c.jpg',
        'out': 'photo3.jpg',
        'upscale': (768, 1020),
        'brightness': 1.06,
        'contrast': 1.07,
        'color': 1.06,
        'sharpness': 1.15
    },
    {
        'file': 'media_1794595365093_364b2304.jpg',
        'out': 'photo4.jpg',
        'brightness': 1.16,
        'contrast': 1.08,
        'color': 1.10,
        'sharpness': 1.08
    },
    {
        'file': 'media_1794595365099_a6f2f7c7.jpg',
        'out': 'photo5.jpg',
        'brightness': 1.03,
        'contrast': 1.05,
        'color': 1.08,
        'sharpness': 1.05
    },
    {
        'file': 'media_1794595365099_e551184d.jpg',
        'out': 'photo6.jpg',
        'brightness': 1.20,
        'contrast': 1.10,
        'color': 1.14,
        'sharpness': 1.10
    },
    {
        'file': 'media_1794595365114_054e9754.jpg',
        'out': 'photo7.jpg',
        'brightness': 1.02,
        'contrast': 1.05,
        'color': 1.10,
        'sharpness': 1.05
    },
    {
        'file': 'media_1794595365114_37e82c72.jpg',
        'out': 'photo8.jpg',
        'brightness': 1.06,
        'contrast': 1.05,
        'color': 1.06,
        'sharpness': 1.06
    },
    {
        'file': 'media_1794595365116_3ffbbc8f.jpg',
        'out': 'photo9.jpg',
        'brightness': 1.04,
        'contrast': 1.05,
        'color': 1.07,
        'sharpness': 1.05
    }
]

for item in photo_specs:
    in_path = os.path.join(src_base, item['file'])
    out_path = os.path.join(out_dir, item['out'])
    im = Image.open(in_path).convert('RGB')

    # Watermark cleanup for photo 1
    if item.get('clean_watermark'):
        # sample patch of grass from above watermark
        patch = im.crop((18, 850, 260, 925))
        im.paste(patch, (18, 925))

    # Optional upscale
    if 'upscale' in item:
        im = im.resize(item['upscale'], Image.Resampling.LANCZOS)

    # Adjustments
    if 'brightness' in item:
        im = ImageEnhance.Brightness(im).enhance(item['brightness'])
    if 'contrast' in item:
        im = ImageEnhance.Contrast(im).enhance(item['contrast'])
    if 'color' in item:
        im = ImageEnhance.Color(im).enhance(item['color'])
    if 'sharpness' in item:
        im = ImageEnhance.Sharpness(im).enhance(item['sharpness'])

    # Save high quality jpeg
    im.save(out_path, 'JPEG', quality=95, optimize=True)
    print(f"Processed {item['out']}: size={im.size}")

print("All 9 photos successfully processed and saved!")
