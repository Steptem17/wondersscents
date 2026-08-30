from PIL import Image, ImageOps
import numpy as np
import os

def process_natural_image(src_path, out_path, max_size=(800, 800), crop_box_pct=None, fill_canvas=True):
    """
    Preserves 100% of the original image's natural color, contrast, and brightness.
    Optional crop_box_pct: (left, top, right, bottom) in percentages 0.0-1.0 to crop to product.
    """
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        return

    img = Image.open(src_path)
    w, h = img.size

    if crop_box_pct:
        l, t, r, b = crop_box_pct
        img = img.crop((int(w * l), int(h * t), int(w * r), int(h * b)))
        w, h = img.size

    if not fill_canvas:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        img.save(out_path, 'PNG', quality=100)
        print(f"Direct cropped image saved: {out_path}")
        return

    scale = min(max_size[0] / w, max_size[1] / h)
    new_w = int(w * scale)
    new_h = int(h * scale)

    resized = img.resize((new_w, new_h), Image.LANCZOS)

    canvas = Image.new('RGB', (800, 800), (255, 255, 255))
    pos = ((800 - new_w) // 2, (800 - new_h) // 2)

    if resized.mode == 'RGBA':
        canvas.paste(resized, pos, resized)
    else:
        canvas.paste(resized, pos)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    canvas.save(out_path, 'PNG', quality=100)
    print(f"Natural untouched image saved: {out_path}")

def process_tight_crop_white_bg(src_path, out_path, bg_threshold=232, max_size=(520, 640), crop_box_pct=None):
    """
    Removes grey backdrops, tightly crops around the product,
    enlarges it to an elegant balanced size with luxury breathing margins, and blends on pure #FFFFFF.
    """
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        return

    img = Image.open(src_path).convert('RGB')
    w, h = img.size

    if crop_box_pct:
        l, t, r, b = crop_box_pct
        img = img.crop((int(w * l), int(h * t), int(w * r), int(h * b)))

    arr = np.array(img)

    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
    is_bg = (r > bg_threshold) & (g > bg_threshold) & (b > bg_threshold)
    arr[is_bg] = [255, 255, 255]

    cleaned = Image.fromarray(arr)

    # Find tight bounding box
    gray = cleaned.convert('L')
    inv = ImageOps.invert(gray)
    bbox = inv.getbbox()

    if bbox:
        cw, ch = cleaned.size
        bw = bbox[2] - bbox[0]
        bh = bbox[3] - bbox[1]
        pad_x = int(bw * 0.02)
        pad_y = int(bh * 0.02)
        box = (
            max(0, bbox[0] - pad_x),
            max(0, bbox[1] - pad_y),
            min(cw, bbox[2] + pad_x),
            min(ch, bbox[3] + pad_y)
        )
        cropped = cleaned.crop(box)
    else:
        cropped = cleaned

    cw, ch = cropped.size
    scale = min(max_size[0] / cw, max_size[1] / ch)
    new_w = int(cw * scale)
    new_h = int(ch * scale)

    resized = cropped.resize((new_w, new_h), Image.LANCZOS)
    canvas = Image.new('RGB', (800, 800), (255, 255, 255))
    pos = ((800 - new_w) // 2, (800 - new_h) // 2)
    canvas.paste(resized, pos)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    canvas.save(out_path, 'PNG', quality=100)
    print(f"Pure white, elegantly scaled image saved: {out_path}")

def process_transparent_hero(src_path, out_path, bg_threshold=240, max_size=(550, 750)):
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        return

    img = Image.open(src_path).convert('RGBA')
    arr = np.array(img)

    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    is_bg = (r >= bg_threshold) & (g >= bg_threshold) & (b >= bg_threshold)
    arr[is_bg, 3] = 0

    transparent_img = Image.fromarray(arr)
    bbox = transparent_img.getbbox()
    if bbox:
        cropped = transparent_img.crop(bbox)
    else:
        cropped = transparent_img

    cw, ch = cropped.size
    scale = min(max_size[0] / cw, max_size[1] / ch)
    new_w = int(cw * scale)
    new_h = int(ch * scale)

    resized = cropped.resize((new_w, new_h), Image.LANCZOS)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    resized.save(out_path, 'PNG', quality=100)
    print(f"Transparent Hero image saved: {out_path}")

# ==========================================
# HOMEPAGE HERO IMAGES (public/images/hero/)
# ==========================================
# Afnan 9 PM (Perfume)
process_transparent_hero(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788043278822.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\hero\hero_afnan_9pm.png', bg_threshold=245)
# Bath & Body Works A Thousand Wishes (Body Mist)
process_transparent_hero(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788044348004.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\hero\hero_bbw_a_thousand_wishes.png', bg_threshold=245)

# ==========================================
# MEN'S ROLL-ONS (public/images/men/)
# ==========================================
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788004985552.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\men\nivea_men_deep_black_carbon_rollon.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788005015147.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\men\nivea_men_fresh_active_rollon.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788005056125.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\men\brut_antiperspirant_rollon.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788005192569.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\men\dove_men_care_classic_rollon.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788005466101.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\men\nivea_men_black_white_rollon.png')

# ==========================================
# WOMEN'S PERFUMES (public/images/women/)
# ==========================================
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788007926056.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\baccarat_rouge_540_extrait.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788007956628.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\baccarat_rouge_540_box.png')

process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788008015018.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\lattafa_yara_pink_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788008036348.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\lattafa_yara_pink_box.png')

process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788008767141.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\lattafa_rave_now_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788008808712.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\lattafa_rave_now_box.png')

process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788008919169.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\lattafa_eclaire_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788008957280.jpg', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\lattafa_eclaire_box.png')

process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788009519111.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\chanel_coco_mademoiselle_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788009533396.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\chanel_coco_mademoiselle_box.png')

process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788009641511.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\lancome_la_vie_est_belle_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788009652060.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\lancome_la_vie_est_belle_box.png')

process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788010419798.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\afnan_9am_pour_femme_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788010478063.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\afnan_9am_pour_femme_box.png')

process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788010696809.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\armaf_club_de_nuit_women_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788010714265.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\armaf_club_de_nuit_women_box.png')

# ==========================================
# WOMEN'S BODY MISTS (public/images/women/)
# ==========================================
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788011381947.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\bbw_into_the_night_mist.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788011439399.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\bbw_youre_the_one_mist.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788011469157.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\bbw_a_thousand_wishes_mist.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788011508631.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\bbw_warm_vanilla_sugar_mist.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788011680833.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\bbw_gingham_mist.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788013149205.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\bbw_japanese_cherry_blossom_mist.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788013521190.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\bbw_dark_kiss_mist.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788013620934.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\armaf_club_de_nuit_woman_mist.png')

# ==========================================
# WOMEN'S BODY SPRAYS (public/images/women/)
# ==========================================
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788027068059.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\nivea_fresh_natural_spray.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788027147407.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\nivea_dry_comfort_spray.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788015566284.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\nivea_pearl_beauty_spray.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788027311669.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\sure_bright_bouquet_spray.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788015853919.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\lady_storm_gentle_spray.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788015891137.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\dove_cool_essentials_spray.png')

# ==========================================
# WOMEN'S ROLL-ONS (public/images/women/)
# ==========================================
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788027316077.jpg', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\nivea_dry_comfort_rollon.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788027336049.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\sure_women_radiant_rollon.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788027966584.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\sure_women_aloe_vera_rollon.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788028006596.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\rexona_cotton_dry_rollon.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788028067046.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\rexona_shower_fresh_rollon.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788028098991.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\mitchum_powder_fresh_rollon.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788028143297.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\dove_invisible_dry_rollon.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788028398168.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\nivea_pearl_beauty_rollon.png', crop_box_pct=(0, 0, 1, 0.93))
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788028412578.jpg', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\women\fa_invisible_power_rollon.png')

# ==========================================
# UNISEX PERFUMES (public/images/unisex/)
# ==========================================
# 1. Modern Musk The Collector's Edition by Maison Alhambra
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788029584670.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\modern_musk_collectors_edition_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788029598286.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\modern_musk_collectors_edition_box.png')

# 2. Swiss Arabian Shaghaf Oud EDP
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788030352679.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\swiss_arabian_shaghaf_oud_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788030369583.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\swiss_arabian_shaghaf_oud_box.png')

# 3. Swiss Arabian Casablanca
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788030407274.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\swiss_arabian_casablanca_bottle.png')
process_tight_crop_white_bg(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788030418102.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\swiss_arabian_casablanca_box.png', bg_threshold=228, max_size=(750, 750))

# 4. Essential Parfums Bois Imperial
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788029786838.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\bois_imperial_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788029796363.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\bois_imperial_box.png')

# 5. Tom Ford Noir de Noir
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788031790454.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\tom_ford_noir_de_noir_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788031829334.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\tom_ford_noir_de_noir_box.png')

# 6. Tom Ford Vanille Fatale
process_tight_crop_white_bg(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788031939699.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\tom_ford_vanille_fatale_bottle.png', bg_threshold=235, max_size=(750, 750))
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788031960974.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\tom_ford_vanille_fatale_box.png')

# 7. Tom Ford Tobacco Oud
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788033296644.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\tom_ford_tobacco_oud_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788033326494.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\tom_ford_tobacco_oud_box.png')

# 8. Lattafa Shaheen Gold
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788033353611.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\lattafa_shaheen_gold_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788033399153.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\lattafa_shaheen_gold_box.png')

# 9. Byredo Bal d'Afrique
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788033459304.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\byredo_bal_dafrique_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788033470811.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\byredo_bal_dafrique_box.png')

# 10. Afnan 9 PM Night Out Extrait de Parfum
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788033573742.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\afnan_9pm_night_out_bottle.png')
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788033590830.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\afnan_9pm_night_out_box.png')

# ==========================================
# UNISEX BODY SPRAYS (public/images/unisex/)
# ==========================================
# 1. Riggs London West Perfumed Deodorant Body Spray
process_tight_crop_white_bg(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788035871268.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\riggs_london_west_spray.png', bg_threshold=235, max_size=(750, 750))

# 2. Fogg Victor Fragrance Body Spray
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788037366837.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\fogg_victor_spray.png')

# 3. Byredo Bal d'Afrique Body Mist
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788037399690.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\byredo_bal_dafrique_mist.png')

# 4. Antonio Banderas Blue Seduction Body Spray
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788037659058.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\antonio_banderas_blue_seduction_spray.png')

# 5. Nautica Voyage / Blue Body Spray
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788037691995.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\nautica_voyage_body_spray.png')

# 6. Davidoff Cool Water Body Spray
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788039011055.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\davidoff_cool_water_spray.png')

# 7. Axe Cherry Spritz Premium Body Spray
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788039036619.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\axe_cherry_spritz_spray.png')

# ==========================================
# UNISEX ROLL-ONS (public/images/unisex/)
# ==========================================
# 1. NIVEA Protect & Care Roll-On
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788039234429.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\nivea_protect_care_rollon.png')

# 2. NIVEA Black & White Invisible White Blossom Roll-On
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788039306660.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\nivea_black_white_white_blossom_rollon.png')

# 3. NIVEA Whitening Smooth Skin Roll-On
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788039365203.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\nivea_whitening_smooth_skin_rollon.png')

# 4. Biotherm Deo Pure Roll-On
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788039424629.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\biotherm_deo_pure_rollon.png')

# 5. Kiehl's Body Fuel Roll-On
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788039480993.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\kiehls_body_fuel_rollon.png')

# 6. The Body Shop Blue Musk Zest Anti-perspirant Deodorant
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788042646395.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\the_body_shop_blue_musk_zest_rollon.png')

# 7. Lea Dermo Sensitive Deo Roll-On
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788042791657.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\unisex\lea_dermo_sensitive_rollon.png')

# ==========================================
# PURE PERFUME OILS (public/images/oils/)
# ==========================================
# 1. Byredo Blanche (Item 1)
process_tight_crop_white_bg(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788051179712.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\oils\byredo_blanche_oil.png', bg_threshold=240, max_size=(520, 640))

# 2. Touch Perfume Oil (Item 2)
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788049124560.jpg', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\oils\touch_perfume_oil.png', crop_box_pct=(0.17, 0.015, 0.80, 0.94), fill_canvas=False)

# 3. Al-Rehab Choco Musk Concentrated Perfume Oil (Item 3)
process_tight_crop_white_bg(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788050301978.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\oils\al_rehab_choco_musk_oil.png', bg_threshold=242, max_size=(500, 620))

# 4. Pheromones Fragrance Oil (Item 4)
process_tight_crop_white_bg(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788050304253.jpg', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\oils\pheromones_fragrance_oil.png', bg_threshold=235, max_size=(520, 640))

# 5. Prada Infusion d'Iris (Item 5)
process_tight_crop_white_bg(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788050412374.png', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\oils\prada_infusion_diris_oil.png', bg_threshold=240, max_size=(520, 640))

# 6. Wonders Scents Pure Perfume Oil (Item 6)
process_natural_image(r'C:\Users\user\.gemini\antigravity\brain\db0775f6-5ac2-42cb-ad65-94b8a533d412\.user_uploaded\media_1788051214929.jpg', r'c:\Users\user\Desktop\Website-projects\wondersscents\public\images\oils\wonders_scents_perfume_oil.png', crop_box_pct=(0.10, 0.28, 0.88, 0.78), fill_canvas=False)

print("All images preserved with 100% natural color, contrast, and original studio quality in their organized folders!")
