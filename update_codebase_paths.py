import os
import re

base_dir = os.path.dirname(__file__)
src_dir = os.path.join(base_dir, 'src')

FILE_DIR_MAP = {
    # HERO
    'hero_afnan_9pm.png': '/images/hero/hero_afnan_9pm.png',
    'hero_bbw_a_thousand_wishes.png': '/images/hero/hero_bbw_a_thousand_wishes.png',
    'hero_nivea_men.png': '/images/hero/hero_nivea_men.png',
    'hero_nivea_coolkick.png': '/images/hero/hero_nivea_coolkick.png',

    # MEN'S COLLECTION
    'afnan_9pm_bottle.png': '/images/men/afnan_9pm_bottle.png',
    'afnan_9pm_box.png': '/images/men/afnan_9pm_box.png',
    'afnan_supremacy_silver_bottle.png': '/images/men/afnan_supremacy_silver_bottle.png',
    'afnan_supremacy_silver_box.png': '/images/men/afnan_supremacy_silver_box.png',
    'armaf_cdnim_bottle.png': '/images/men/armaf_cdnim_bottle.png',
    'armaf_cdnim_box.png': '/images/men/armaf_cdnim_box.png',
    'armaf_shades_body_spray_black.png': '/images/men/armaf_shades_body_spray_black.png',
    'armaf_shades_body_spray_wood.png': '/images/men/armaf_shades_body_spray_wood.png',
    'axe_apollo_body_spray.png': '/images/men/axe_apollo_body_spray.png',
    'axe_black_body_spray.png': '/images/men/axe_black_body_spray.png',
    'bbw_gingham_hero_body_spray.png': '/images/men/bbw_gingham_hero_body_spray.png',
    'bbw_gingham_legend_body_spray.png': '/images/men/bbw_gingham_legend_body_spray.png',
    'bbw_noir_body_spray.png': '/images/men/bbw_noir_body_spray.png',
    'bbw_vanilla_noir_body_spray.png': '/images/men/bbw_vanilla_noir_body_spray.png',
    'bleu_de_chanel_bottle.png': '/images/men/bleu_de_chanel_bottle.png',
    'bleu_de_chanel_box.png': '/images/men/bleu_de_chanel_box.png',
    'brut_antiperspirant_rollon.png': '/images/men/brut_antiperspirant_rollon.png',
    'brut_blue_deodorant_spray.png': '/images/men/brut_blue_deodorant_spray.png',
    'brut_green_deodorant_spray.png': '/images/men/brut_green_deodorant_spray.png',
    'creed_aventus_bottle.png': '/images/men/creed_aventus_bottle.png',
    'creed_aventus_box.png': '/images/men/creed_aventus_box.png',
    'dior_sauvage_bottle.png': '/images/men/dior_sauvage_bottle.png',
    'dior_sauvage_box.png': '/images/men/dior_sauvage_box.png',
    'dove_men_care_classic_rollon.png': '/images/men/dove_men_care_classic_rollon.png',
    'dove_men_care_elements.png': '/images/men/dove_men_care_elements.png',
    'dove_men_care_invisible_dry.png': '/images/men/dove_men_care_invisible_dry.png',
    'dove_men_care_sandalwood.png': '/images/men/dove_men_care_sandalwood.png',
    'lattafa_asad_body_spray.png': '/images/men/lattafa_asad_body_spray.png',
    'lattafa_asad_bottle.png': '/images/men/lattafa_asad_bottle.png',
    'lattafa_asad_box.png': '/images/men/lattafa_asad_box.png',
    'nivea_men_black_white_rollon.png': '/images/men/nivea_men_black_white_rollon.png',
    'nivea_men_deep_black_carbon_rollon.png': '/images/men/nivea_men_deep_black_carbon_rollon.png',
    'nivea_men_deep_body_spray.png': '/images/men/nivea_men_deep_body_spray.png',
    'nivea_men_deep_darkwood_rollon.png': '/images/men/nivea_men_deep_darkwood_rollon.png',
    'nivea_men_dry_impact_body_spray.png': '/images/men/nivea_men_dry_impact_body_spray.png',
    'nivea_men_fresh_active_rollon.png': '/images/men/nivea_men_fresh_active_rollon.png',
    'rexona_invisible_active_spray.png': '/images/men/rexona_invisible_active_spray.png',
    'rexona_invisible_ice_spray.png': '/images/men/rexona_invisible_ice_spray.png',
    'rexona_men_invisible_dry_rollon.png': '/images/men/rexona_men_invisible_dry_rollon.png',
    'riggs_ace_body_spray.png': '/images/men/riggs_ace_body_spray.png',
    'riggs_icon_body_spray.png': '/images/men/riggs_icon_body_spray.png',
    'romano_attitude_rollon.png': '/images/men/romano_attitude_rollon.png',
    'romano_force_rollon.png': '/images/men/romano_force_rollon.png',
    'romano_gentleman_rollon.png': '/images/men/romano_gentleman_rollon.png',
    'storm_bear_skin_spray.png': '/images/men/storm_bear_skin_spray.png',
    'storm_king_oud_spray.png': '/images/men/storm_king_oud_spray.png',
    'ysl_myslf_bottle.png': '/images/men/ysl_myslf_bottle.png',
    'ysl_myslf_box.png': '/images/men/ysl_myslf_box.png',

    # WOMEN'S COLLECTION
    'afnan_9am_pour_femme_bottle.png': '/images/women/afnan_9am_pour_femme_bottle.png',
    'afnan_9am_pour_femme_box.png': '/images/women/afnan_9am_pour_femme_box.png',
    'armaf_club_de_nuit_woman_mist.png': '/images/women/armaf_club_de_nuit_woman_mist.png',
    'armaf_club_de_nuit_women_bottle.png': '/images/women/armaf_club_de_nuit_women_bottle.png',
    'armaf_club_de_nuit_women_box.png': '/images/women/armaf_club_de_nuit_women_box.png',
    'baccarat_rouge_540_box.png': '/images/women/baccarat_rouge_540_box.png',
    'baccarat_rouge_540_extrait.png': '/images/women/baccarat_rouge_540_extrait.png',
    'bbw_a_thousand_wishes_mist.png': '/images/women/bbw_a_thousand_wishes_mist.png',
    'bbw_dark_kiss_mist.png': '/images/women/bbw_dark_kiss_mist.png',
    'bbw_gingham_mist.png': '/images/women/bbw_gingham_mist.png',
    'bbw_into_the_night_mist.png': '/images/women/bbw_into_the_night_mist.png',
    'bbw_japanese_cherry_blossom_mist.png': '/images/women/bbw_japanese_cherry_blossom_mist.png',
    'bbw_warm_vanilla_sugar_mist.png': '/images/women/bbw_warm_vanilla_sugar_mist.png',
    'bbw_youre_the_one_mist.png': '/images/women/bbw_youre_the_one_mist.png',
    'chanel_coco_mademoiselle_bottle.png': '/images/women/chanel_coco_mademoiselle_bottle.png',
    'chanel_coco_mademoiselle_box.png': '/images/women/chanel_coco_mademoiselle_box.png',
    'dove_cool_essentials_spray.png': '/images/women/dove_cool_essentials_spray.png',
    'dove_invisible_dry_rollon.png': '/images/women/dove_invisible_dry_rollon.png',
    'fa_invisible_power_rollon.png': '/images/women/fa_invisible_power_rollon.png',
    'lady_storm_gentle_spray.png': '/images/women/lady_storm_gentle_spray.png',
    'lancome_la_vie_est_belle_bottle.png': '/images/women/lancome_la_vie_est_belle_bottle.png',
    'lancome_la_vie_est_belle_box.png': '/images/women/lancome_la_vie_est_belle_box.png',
    'lattafa_eclaire_bottle.png': '/images/women/lattafa_eclaire_bottle.png',
    'lattafa_eclaire_box.png': '/images/women/lattafa_eclaire_box.png',
    'lattafa_rave_now_bottle.png': '/images/women/lattafa_rave_now_bottle.png',
    'lattafa_rave_now_box.png': '/images/women/lattafa_rave_now_box.png',
    'lattafa_yara_pink_bottle.png': '/images/women/lattafa_yara_pink_bottle.png',
    'lattafa_yara_pink_box.png': '/images/women/lattafa_yara_pink_box.png',
    'mitchum_powder_fresh_rollon.png': '/images/women/mitchum_powder_fresh_rollon.png',
    'nivea_dry_comfort_rollon.png': '/images/women/nivea_dry_comfort_rollon.png',
    'nivea_dry_comfort_spray.png': '/images/women/nivea_dry_comfort_spray.png',
    'nivea_fresh_natural_spray.png': '/images/women/nivea_fresh_natural_spray.png',
    'nivea_pearl_beauty_rollon.png': '/images/women/nivea_pearl_beauty_rollon.png',
    'nivea_pearl_beauty_spray.png': '/images/women/nivea_pearl_beauty_spray.png',
    'rexona_cotton_dry_rollon.png': '/images/women/rexona_cotton_dry_rollon.png',
    'rexona_shower_fresh_rollon.png': '/images/women/rexona_shower_fresh_rollon.png',
    'sure_bright_bouquet_spray.png': '/images/women/sure_bright_bouquet_spray.png',
    'sure_women_aloe_vera_rollon.png': '/images/women/sure_women_aloe_vera_rollon.png',
    'sure_women_radiant_rollon.png': '/images/women/sure_women_radiant_rollon.png',
    'u2_body_splash_bottle.png': '/images/women/u2_body_splash_bottle.png',
    'u2_body_splash_box.png': '/images/women/u2_body_splash_box.png',

    # UNISEX COLLECTION
    'afnan_9pm_night_out_bottle.png': '/images/unisex/afnan_9pm_night_out_bottle.png',
    'afnan_9pm_night_out_box.png': '/images/unisex/afnan_9pm_night_out_box.png',
    'antonio_banderas_blue_seduction_spray.png': '/images/unisex/antonio_banderas_blue_seduction_spray.png',
    'axe_cherry_spritz_spray.png': '/images/unisex/axe_cherry_spritz_spray.png',
    'biotherm_deo_pure_rollon.png': '/images/unisex/biotherm_deo_pure_rollon.png',
    'bois_imperial_bottle.png': '/images/unisex/bois_imperial_bottle.png',
    'bois_imperial_box.png': '/images/unisex/bois_imperial_box.png',
    'byredo_bal_dafrique_bottle.png': '/images/unisex/byredo_bal_dafrique_bottle.png',
    'byredo_bal_dafrique_box.png': '/images/unisex/byredo_bal_dafrique_box.png',
    'byredo_bal_dafrique_mist.png': '/images/unisex/byredo_bal_dafrique_mist.png',
    'ck_one_body_spray_silver.png': '/images/unisex/ck_one_body_spray_silver.png',
    'ck_one_body_spray_white.png': '/images/unisex/ck_one_body_spray_white.png',
    'davidoff_cool_water_spray.png': '/images/unisex/davidoff_cool_water_spray.png',
    'fogg_victor_spray.png': '/images/unisex/fogg_victor_spray.png',
    'kiehls_body_fuel_rollon.png': '/images/unisex/kiehls_body_fuel_rollon.png',
    'lattafa_shaheen_gold_bottle.png': '/images/unisex/lattafa_shaheen_gold_bottle.png',
    'lattafa_shaheen_gold_box.png': '/images/unisex/lattafa_shaheen_gold_box.png',
    'lea_dermo_sensitive_rollon.png': '/images/unisex/lea_dermo_sensitive_rollon.png',
    'modern_musk_collectors_edition_bottle.png': '/images/unisex/modern_musk_collectors_edition_bottle.png',
    'modern_musk_collectors_edition_box.png': '/images/unisex/modern_musk_collectors_edition_box.png',
    'nautica_voyage_body_spray.png': '/images/unisex/nautica_voyage_body_spray.png',
    'nivea_black_white_white_blossom_rollon.png': '/images/unisex/nivea_black_white_white_blossom_rollon.png',
    'nivea_protect_care_rollon.png': '/images/unisex/nivea_protect_care_rollon.png',
    'nivea_whitening_smooth_skin_rollon.png': '/images/unisex/nivea_whitening_smooth_skin_rollon.png',
    'riggs_london_west_spray.png': '/images/unisex/riggs_london_west_spray.png',
    'swiss_arabian_casablanca_bottle.png': '/images/unisex/swiss_arabian_casablanca_bottle.png',
    'swiss_arabian_casablanca_box.png': '/images/unisex/swiss_arabian_casablanca_box.png',
    'swiss_arabian_shaghaf_oud_bottle.png': '/images/unisex/swiss_arabian_shaghaf_oud_bottle.png',
    'swiss_arabian_shaghaf_oud_box.png': '/images/unisex/swiss_arabian_shaghaf_oud_box.png',
    'the_body_shop_blue_musk_zest_rollon.png': '/images/unisex/the_body_shop_blue_musk_zest_rollon.png',
    'tom_ford_noir_de_noir_bottle.png': '/images/unisex/tom_ford_noir_de_noir_bottle.png',
    'tom_ford_noir_de_noir_box.png': '/images/unisex/tom_ford_noir_de_noir_box.png',
    'tom_ford_tobacco_oud_bottle.png': '/images/unisex/tom_ford_tobacco_oud_bottle.png',
    'tom_ford_tobacco_oud_box.png': '/images/unisex/tom_ford_tobacco_oud_box.png',
    'tom_ford_vanille_fatale_bottle.png': '/images/unisex/tom_ford_vanille_fatale_bottle.png',
    'tom_ford_vanille_fatale_box.png': '/images/unisex/tom_ford_vanille_fatale_box.png',

    # PURE PERFUME OILS
    'al_rehab_choco_musk_oil.png': '/images/oils/al_rehab_choco_musk_oil.png',
    'byredo_blanche_oil.png': '/images/oils/byredo_blanche_oil.png',
    'pheromones_fragrance_oil.png': '/images/oils/pheromones_fragrance_oil.png',
    'prada_infusion_diris_oil.png': '/images/oils/prada_infusion_diris_oil.png',
    'touch_perfume_oil.png': '/images/oils/touch_perfume_oil.png',
    'wonders_scents_perfume_oil.png': '/images/oils/wonders_scents_perfume_oil.png',

    # GENERAL / BRANDING
    'logo.png': '/images/general/logo.png',
    'collection_men.jpg': '/images/general/collection_men.jpg',
    'collection_women.jpg': '/images/general/collection_women.jpg',
    'collection_unisex.jpg': '/images/general/collection_unisex.jpg',
    'collection_perfume_oil.jpg': '/images/general/collection_perfume_oil.jpg',
    'founder.jpg': '/images/general/founder.jpg',
    'icons.svg': '/images/general/icons.svg',
}

def update_files():
    for root, _, files in os.walk(src_dir):
        for f in files:
            if f.endswith(('.ts', '.tsx', '.css', '.html')):
                filepath = os.path.join(root, f)
                with open(filepath, 'r', encoding='utf-8') as fh:
                    content = fh.read()

                updated = content
                for old_name, new_path in FILE_DIR_MAP.items():
                    # Replace '/filename' with '/images/category/filename'
                    updated = updated.replace(f"'{old_name}'", f"'{new_path}'")
                    updated = updated.replace(f'"{old_name}"', f'"{new_path}"')
                    updated = updated.replace(f"'/{old_name}'", f"'{new_path}'")
                    updated = updated.replace(f'"/{old_name}"', f'"{new_path}"')

                if updated != content:
                    with open(filepath, 'w', encoding='utf-8') as fh:
                        fh.write(updated)
                    print(f"Updated paths in: {filepath}")

if __name__ == '__main__':
    update_files()
