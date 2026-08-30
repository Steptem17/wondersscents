import os
import glob
import subprocess
from PIL import Image

UNUSED_FILES_TO_CLEAN = [
    # Old Placeholder JPEGs
    'public/afnan_9pm.jpg',
    'public/armaf_cdn_man.jpg',
    'public/armaf_cdn_woman.jpg',
    'public/armaf_cdnim_bottle.jpg',
    'public/armaf_cdnim_box.jpg',
    'public/dior_sauvage.jpg',
    'public/franck_olivier_oud.jpg',
    'public/lattafa_asad_bottle.jpg',
    'public/lattafa_asad_box.jpg',
    'public/nivea_men.jpg',
    'public/riggs_icon.jpg',
    'public/victorias_secret.jpg',
    'public/lifestyle_model.jpg',
    'public/perfume_oil.jpg',
    # Superseded Hero Test Images
    'public/hero_bbw_into_the_night.png',
    'public/hero_chopard.png',
    'public/hero_nivea_pearl.png',
    'public/hero_victorias_secret.png',
    'public/lattafa_asad_isabelle_body_spray.png',
    # Old Scratch Scripts
    'process_rollon_imgs.py',
]

def cleanup_unused_files(base_dir):
    print("==================================================")
    print("CLEANING UP UNUSED FILES & OLD PLACEHOLDERS")
    print("==================================================")
    deleted_count = 0
    freed_bytes = 0

    for rel_path in UNUSED_FILES_TO_CLEAN:
        full_path = os.path.join(base_dir, rel_path)
        if os.path.exists(full_path):
            try:
                sz = os.path.getsize(full_path)
                os.remove(full_path)
                freed_bytes += sz
                deleted_count += 1
                print(f"Deleted: {rel_path} ({sz/1024:.1f} KB)")
            except Exception as e:
                print(f"Could not delete {rel_path}: {e}")

    print(f"\nCleanup finished: {deleted_count} files removed ({freed_bytes / (1024*1024):.2f} MB freed)!\n")

def optimize_video(video_path):
    """
    Compresses MP4 video using H.264 with +faststart flag.
    +faststart enables instant playback in browsers without buffering the entire file!
    """
    if not os.path.exists(video_path):
        return

    size_before = os.path.getsize(video_path)
    temp_output = video_path + ".compressed.mp4"

    try:
        cmd = [
            'ffmpeg', '-y', '-i', video_path,
            '-vcodec', 'libx264',
            '-crf', '24',
            '-preset', 'medium',
            '-an', # strip unnecessary audio tracks for muted autoplay
            '-movflags', '+faststart',
            temp_output
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0 and os.path.exists(temp_output):
            size_after = os.path.getsize(temp_output)
            if size_after < size_before:
                os.replace(temp_output, video_path)
                pct = (size_before - size_after) / size_before * 100
                print(f"Video compressed: {os.path.basename(video_path)} {size_before/(1024*1024):.2f} MB -> {size_after/(1024*1024):.2f} MB (-{pct:.1f}%) [Instant +faststart enabled]")
                return
            else:
                os.remove(temp_output)
        print(f"Video checked: {os.path.basename(video_path)} ({size_before / (1024*1024):.2f} MB)")
    except Exception:
        print(f"Video present: {os.path.basename(video_path)} ({size_before / (1024*1024):.2f} MB)")

def optimize_assets(public_dir):
    print("==================================================")
    print("STARTING ASSET & VIDEO COMPRESSION (100% QUALITY)")
    print("==================================================")

    total_before = 0
    total_after = 0
    files_processed = 0

    image_extensions = ('*.png', '*.jpg', '*.jpeg', '*.webp')
    all_files = []
    for ext in image_extensions:
        all_files.extend(glob.glob(os.path.join(public_dir, ext)))
        all_files.extend(glob.glob(os.path.join(public_dir, '**', ext), recursive=True))

    all_files = list(set(all_files))

    for file_path in all_files:
        try:
            size_before = os.path.getsize(file_path)
            total_before += size_before

            img = Image.open(file_path)
            ext = os.path.splitext(file_path)[1].lower()

            temp_path = file_path + ".tmp"

            if ext == '.png':
                img.save(temp_path, 'PNG', optimize=True, compress_level=9)
            elif ext in ('.jpg', '.jpeg'):
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                img.save(temp_path, 'JPEG', quality=88, optimize=True, progressive=True)
            elif ext == '.webp':
                if img.mode in ('RGBA', 'LA'):
                    img.save(temp_path, 'WEBP', lossless=True, quality=90, method=6)
                else:
                    img.save(temp_path, 'WEBP', quality=88, method=6)

            size_after = os.path.getsize(temp_path)

            if size_after <= size_before:
                os.replace(temp_path, file_path)
                final_size = size_after
            else:
                os.remove(temp_path)
                final_size = size_before

            total_after += final_size
            files_processed += 1

            savings_pct = ((size_before - final_size) / size_before * 100) if size_before > 0 else 0
            file_name = os.path.basename(file_path)
            print(f"[OK] {file_name:<40} {size_before/1024:>7.1f} KB -> {final_size/1024:>7.1f} KB  (-{savings_pct:>4.1f}%)")

        except Exception as e:
            print(f"[ERR] Error compressing {file_path}: {e}")

    # Optimize Homepage Videos
    video_files = glob.glob(os.path.join(public_dir, '*.mp4'))
    for v in video_files:
        optimize_video(v)

    saved_mb = (total_before - total_after) / (1024 * 1024)
    print("\n==================================================")
    print("COMPRESSION COMPLETE!")
    print(f"Total Images Processed: {files_processed}")
    print(f"Original Total Size:   {total_before / (1024*1024):.2f} MB")
    print(f"Optimized Total Size:  {total_after / (1024*1024):.2f} MB")
    print(f"Bandwidth Saved:        {saved_mb:.2f} MB ({((total_before - total_after)/total_before*100) if total_before>0 else 0:.1f}% reduction)")
    print("==================================================")

if __name__ == '__main__':
    base_project_directory = os.path.dirname(__file__)
    public_directory = os.path.join(base_project_directory, 'public')
    
    # 1. First remove all unused/unreferenced files
    cleanup_unused_files(base_project_directory)
    
    # 2. Optimize and compress all active website assets
    optimize_assets(public_directory)
