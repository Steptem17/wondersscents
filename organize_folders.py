import os
import shutil

base_dir = os.path.dirname(__file__)
public_dir = os.path.join(base_dir, 'public')

# Define target directories
DIRS = {
    'hero': os.path.join(public_dir, 'images', 'hero'),
    'men': os.path.join(public_dir, 'images', 'men'),
    'women': os.path.join(public_dir, 'images', 'women'),
    'unisex': os.path.join(public_dir, 'images', 'unisex'),
    'oils': os.path.join(public_dir, 'images', 'oils'),
    'general': os.path.join(public_dir, 'images', 'general'),
}

for d in DIRS.values():
    os.makedirs(d, exist_ok=True)

# Mapping of filenames to category folder
FILE_MAP = {
    # HERO
    'hero_afnan_9pm.png': 'hero',
    'hero_bbw_a_thousand_wishes.png': 'hero',
    'hero_nivea_men.png': 'hero',
    'hero_nivea_coolkick.png': 'hero',

    # MEN'S COLLECTION
    'afnan_9pm_bottle.png': 'men',
    'afnan_9pm_box.png': 'men',
    'afnan_supremacy_silver_bottle.png': 'men',
    'afnan_supremacy_silver_box.png': 'men',
    'armaf_cdnim_bottle.png': 'men',
    'armaf_cdnim_box.png': 'men',
    'armaf_shades_body_spray_black.png': 'men',
    'armaf_shades_body_spray_wood.png': 'men',
    'axe_apollo_body_spray.png': 'men',
    'axe_black_body_spray.png': 'men',
    'bbw_gingham_hero_body_spray.png': 'men',
    'bbw_gingham_legend_body_spray.png': 'men',
    'bbw_noir_body_spray.png': 'men',
    'bbw_vanilla_noir_body_spray.png': 'men',
    'bleu_de_chanel_bottle.png': 'men',
    'bleu_de_chanel_box.png': 'men',
    'brut_antiperspirant_rollon.png': 'men',
    'brut_blue_deodorant_spray.png': 'men',
    'brut_green_deodorant_spray.png': 'men',
    'creed_aventus_bottle.png': 'men',
    'creed_aventus_box.png': 'men',
    'dior_sauvage_bottle.png': 'men',
    'dior_sauvage_box.png': 'men',
    'dove_men_care_classic_rollon.png': 'men',
    'dove_men_care_elements.png': 'men',
    'dove_men_care_invisible_dry.png': 'men',
    'dove_men_care_sandalwood.png': 'men',
    'lattafa_asad_body_spray.png': 'men',
    'lattafa_asad_bottle.png': 'men',
    'lattafa_asad_box.png': 'men',
    'nivea_men_black_white_rollon.png': 'men',
    'nivea_men_deep_black_carbon_rollon.png': 'men',
    'nivea_men_deep_body_spray.png': 'men',
    'nivea_men_deep_darkwood_rollon.png': 'men',
    'nivea_men_dry_impact_body_spray.png': 'men',
    'nivea_men_fresh_active_rollon.png': 'men',
    'rexona_invisible_active_spray.png': 'men',
    'rexona_invisible_ice_spray.png': 'men',
    'rexona_men_invisible_dry_rollon.png': 'men',
    'riggs_ace_body_spray.png': 'men',
    'riggs_icon_body_spray.png': 'men',
    'romano_attitude_rollon.png': 'men',
    'romano_force_rollon.png': 'men',
    'romano_gentleman_rollon.png': 'men',
    'storm_bear_skin_spray.png': 'men',
    'storm_king_oud_spray.png': 'men',
    'ysl_myslf_bottle.png': 'men',
    'ysl_myslf_box.png': 'men',

    # WOMEN'S COLLECTION
    'afnan_9am_pour_femme_bottle.png': 'women',
    'afnan_9am_pour_femme_box.png': 'women',
    'armaf_club_de_nuit_woman_mist.png': 'women',
    'armaf_club_de_nuit_women_bottle.png': 'women',
    'armaf_club_de_nuit_women_box.png': 'women',
    'baccarat_rouge_540_box.png': 'women',
    'baccarat_rouge_540_extrait.png': 'women',
    'bbw_a_thousand_wishes_mist.png': 'women',
    'bbw_dark_kiss_mist.png': 'women',
    'bbw_gingham_mist.png': 'women',
    'bbw_into_the_night_mist.png': 'women',
    'bbw_japanese_cherry_blossom_mist.png': 'women',
    'bbw_warm_vanilla_sugar_mist.png': 'women',
    'bbw_youre_the_one_mist.png': 'women',
    'chanel_coco_mademoiselle_bottle.png': 'women',
    'chanel_coco_mademoiselle_box.png': 'women',
    'dove_cool_essentials_spray.png': 'women',
    'dove_invisible_dry_rollon.png': 'women',
    'fa_invisible_power_rollon.png': 'women',
    'lady_storm_gentle_spray.png': 'women',
    'lancome_la_vie_est_belle_bottle.png': 'women',
    'lancome_la_vie_est_belle_box.png': 'women',
    'lattafa_eclaire_bottle.png': 'women',
    'lattafa_eclaire_box.png': 'women',
    'lattafa_rave_now_bottle.png': 'women',
    'lattafa_rave_now_box.png': 'women',
    'lattafa_yara_pink_bottle.png': 'women',
    'lattafa_yara_pink_box.png': 'women',
    'mitchum_powder_fresh_rollon.png': 'women',
    'nivea_dry_comfort_rollon.png': 'women',
    'nivea_dry_comfort_spray.png': 'women',
    'nivea_fresh_natural_spray.png': 'women',
    'nivea_pearl_beauty_rollon.png': 'women',
    'nivea_pearl_beauty_spray.png': 'women',
    'rexona_cotton_dry_rollon.png': 'women',
    'rexona_shower_fresh_rollon.png': 'women',
    'sure_bright_bouquet_spray.png': 'women',
    'sure_women_aloe_vera_rollon.png': 'women',
    'sure_women_radiant_rollon.png': 'women',
    'u2_body_splash_bottle.png': 'women',
    'u2_body_splash_box.png': 'women',

    # UNISEX COLLECTION
    'afnan_9pm_night_out_bottle.png': 'unisex',
    'afnan_9pm_night_out_box.png': 'unisex',
    'antonio_banderas_blue_seduction_spray.png': 'unisex',
    'axe_cherry_spritz_spray.png': 'unisex',
    'biotherm_deo_pure_rollon.png': 'unisex',
    'bois_imperial_bottle.png': 'unisex',
    'bois_imperial_box.png': 'unisex',
    'byredo_bal_dafrique_bottle.png': 'unisex',
    'byredo_bal_dafrique_box.png': 'unisex',
    'byredo_bal_dafrique_mist.png': 'unisex',
    'ck_one_body_spray_silver.png': 'unisex',
    'ck_one_body_spray_white.png': 'unisex',
    'davidoff_cool_water_spray.png': 'unisex',
    'fogg_victor_spray.png': 'unisex',
    'kiehls_body_fuel_rollon.png': 'unisex',
    'lattafa_shaheen_gold_bottle.png': 'unisex',
    'lattafa_shaheen_gold_box.png': 'unisex',
    'lea_dermo_sensitive_rollon.png': 'unisex',
    'modern_musk_collectors_edition_bottle.png': 'unisex',
    'modern_musk_collectors_edition_box.png': 'unisex',
    'nautica_voyage_body_spray.png': 'unisex',
    'nivea_black_white_white_blossom_rollon.png': 'unisex',
    'nivea_protect_care_rollon.png': 'unisex',
    'nivea_whitening_smooth_skin_rollon.png': 'unisex',
    'riggs_london_west_spray.png': 'unisex',
    'swiss_arabian_casablanca_bottle.png': 'unisex',
    'swiss_arabian_casablanca_box.png': 'unisex',
    'swiss_arabian_shaghaf_oud_bottle.png': 'unisex',
    'swiss_arabian_shaghaf_oud_box.png': 'unisex',
    'the_body_shop_blue_musk_zest_rollon.png': 'unisex',
    'tom_ford_noir_de_noir_bottle.png': 'unisex',
    'tom_ford_noir_de_noir_box.png': 'unisex',
    'tom_ford_tobacco_oud_bottle.png': 'unisex',
    'tom_ford_tobacco_oud_box.png': 'unisex',
    'tom_ford_vanille_fatale_bottle.png': 'unisex',
    'tom_ford_vanille_fatale_box.png': 'unisex',

    # PURE PERFUME OILS
    'al_rehab_choco_musk_oil.png': 'oils',
    'byredo_blanche_oil.png': 'oils',
    'pheromones_fragrance_oil.png': 'oils',
    'prada_infusion_diris_oil.png': 'oils',
    'touch_perfume_oil.png': 'oils',
    'wonders_scents_perfume_oil.png': 'oils',

    # GENERAL / BRANDING
    'logo.png': 'general',
    'collection_men.jpg': 'general',
    'collection_women.jpg': 'general',
    'collection_unisex.jpg': 'general',
    'collection_perfume_oil.jpg': 'general',
    'founder.jpg': 'general',
    'icons.svg': 'general',
}

def move_files():
    print("==================================================")
    print("ORGANIZING ASSETS INTO DEDICATED SUBFOLDERS")
    print("==================================================")
    moved = 0
    for filename, category in FILE_MAP.items():
        src = os.path.join(public_dir, filename)
        dst = os.path.join(DIRS[category], filename)
        if os.path.exists(src):
            shutil.move(src, dst)
            moved += 1
            print(f"Moved to public/images/{category}/: {filename}")

    # Generate / copy favicon from logo
    logo_src = os.path.join(DIRS['general'], 'logo.png')
    if os.path.exists(logo_src):
        shutil.copy(logo_src, os.path.join(public_dir, 'favicon.png'))
        shutil.copy(logo_src, os.path.join(public_dir, 'favicon.ico'))
        print("Generated brand favicons: public/favicon.png and public/favicon.ico")

    print(f"\nOrganization Complete! {moved} files organized into clean subdirectories.\n")

if __name__ == '__main__':
    move_files()
