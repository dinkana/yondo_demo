"""Build original, deterministic travel illustrations; no stock images or network."""
from pathlib import Path
import math
import random
import re
import zlib

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'public' / 'art'
PALETTES = {
    'mountain': ('#dfbfa2','#f2e0bc','#819b8a','#587767','#355c4d','#203f36','#a36c49'),
    'winter': ('#87a7ad','#eddfca','#869a9e','#59737b','#d0dfd9','#263f48','#f5e8d4'),
    'water': ('#91b0aa','#e8dfbb','#96a98b','#678b74','#315f50','#173c3a','#d69c63'),
    'cave': ('#b5a084','#edc58c','#c28f67','#806450','#4a3d38','#282c2e','#e7a56c'),
    'autumn': ('#c48f78','#f6d6a2','#a69472','#8d774f','#535c43','#293f37','#da9e62'),
}

def illustration(key, scene, hero=False):
    rng = random.Random(zlib.crc32(key.encode()))
    sky, light, far, mid, near, shade, accent = PALETTES[scene]
    horizon = 380 + rng.randrange(-40, 39)
    sun_x = 700 if hero else rng.randrange(240, 760)
    art = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 720" width="800" height="600">',
        f'''<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="{sky}"/><stop offset="1" stop-color="{light}"/></linearGradient>
        <linearGradient id="ground" x2=".35" y2="1"><stop stop-color="{near}"/><stop offset="1" stop-color="{shade}"/></linearGradient>
        <linearGradient id="water" x2="0" y2="1"><stop stop-color="{light}"/><stop offset=".45" stop-color="{mid}"/><stop offset="1" stop-color="{shade}"/></linearGradient>
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".68" numOctaves="3" stitchTiles="stitch"/></filter></defs>''',
        '<path fill="url(#sky)" d="M0 0H960V720H0Z"/>',
        f'<circle cx="{sun_x}" cy="{horizon-155}" r="62" fill="{light}" opacity=".52"/><circle cx="{sun_x}" cy="{horizon-155}" r="44" fill="{light}"/>']
    for i in range(13):
        x,y = rng.randrange(-80,910),rng.randrange(100,horizon-50)
        art.append(f'<path d="M{x} {y}q{rng.randrange(30,120)} -11 {rng.randrange(130,370)} -3" fill="none" stroke="{light}" stroke-width="{rng.randrange(1,5)}" opacity=".22"/>')
    for layer, color in enumerate((far, mid, near)):
        base = horizon + layer*58
        phase = rng.random()*6
        ridge = [(x, int(base + (52+8*layer)*math.sin(x/118+phase) + 24*math.sin(x/66+phase*3) + rng.randrange(-19,20))) for x in range(0,961,32)]
        pts = ' '.join(f'{x},{y}' for x,y in ridge)
        art.append(f'<path d="M{pts.replace(" "," L")} L960 720H0Z" fill="{color}"/>')
        for (x,y),(nx,ny) in zip(ridge, ridge[1:]):
            if rng.random() < .65:
                art.append(f'<path d="M{x},{y} L{nx},{ny} {nx-37},{ny+65} {x+5},{y+102}Z" fill="{shade}" opacity=".11"/>')
        if scene == 'winter':
            art.append(f'<polyline points="{pts}" fill="none" stroke="{accent}" stroke-width="5" opacity=".55"/>')
    if scene == 'water':
        art.append('<path fill="url(#water)" d="M0 486Q210 494 377 454T960 485V720H0Z"/>')
        for _ in range(105):
            x,y = rng.randrange(0,960),rng.randrange(487,715)
            art.append(f'<path d="M{x} {y}h{rng.randrange(4,100)}" stroke="{light}" opacity="{rng.uniform(.08,.37):.2f}" stroke-width="{rng.choice([1,1,2,3])}"/>')
        art.append(f'<path d="M0 528Q75 547 207 615T481 720H0ZM960 569Q831 562 809 631T704 720H960Z" fill="{shade}"/>')
        x = rng.randrange(370,615)
        art.append(f'<path d="M{x-39} 592q46 9 89 -8q-39 26 -89 8Z" fill="{accent}"/><path d="M{x-2} 586l17 -17" stroke="{shade}" stroke-width="2"/>')
    elif scene == 'cave':
        art.append('''<path fill="url(#ground)" fill-rule="evenodd" d="M0 0H960V720H0ZM246 681Q228 635 262 543L286 453 327 382 347 300 412 215 491 192 539 214 555 267 607 281 640 381 694 431 720 529 751 657 700 720H246Z"/>''')
        for x,y in [(130,210),(326,190),(735,250),(782,490),(179,558),(116,433),(611,90)]:
            art.append(f'<path d="M{x-160} {y+103}l96 -74 47 -16 109 -83 140 -20 -138 61 -70 107 -115 62Z" fill="{accent}" opacity=".12"/>')
        art.append(f'<path d="M300 720Q385 633 452 610L548 612 696 720Z" fill="{accent}" opacity=".50"/>')
    else:
        art.append('<path d="M0 558Q156 495 311 557T563 594Q763 508 960 516V720H0Z" fill="url(#ground)"/>')
        art.append(f'<path d="M348 720Q498 624 600 617T640 579q91 21 -34 63t-114 78Z" fill="{accent}" opacity=".78"/>')
    if scene != 'cave':
        for _ in range(275):
            x = rng.randrange(0,960)
            if scene == 'water' and 170 < x < 830:
                continue
            if scene != 'water' and 335 < x < 660:
                continue
            y = rng.randrange(555,743)
            height = int(rng.uniform(8,36) * (y-486)/100)
            half = max(2,height//5)
            color = rng.choice((shade, near, shade, mid))
            art.append(f'<path d="M{x} {y-height}l{half} {int(height*.68)}h-{half//2}l{half//2} {int(height*.32)}h-{2*half}l{half//2} -{int(height*.32)}h-{half//2}Z" fill="{color}"/>')
    for i in range(3):
        x,y = sun_x-80+i*29,horizon-123-i*13
        art.append(f'<path d="M{x} {y}q6 -3 12 3q7 -6 14 -5" fill="none" stroke="{shade}" stroke-opacity=".64" stroke-width="1.8"/>')
    art += ['<path d="M0 0H960V720H0Z" filter="url(#grain)" opacity=".13" style="mix-blend-mode:multiply"/>','</svg>']
    (ART / f'{key}.svg').write_text('\n'.join(art)+'\n', encoding='utf-8')

if __name__ == '__main__':
    ART.mkdir(parents=True, exist_ok=True)
    files = {path.stem: path for path in (ROOT/'src'/'data'/'tours').glob('*.ts')}
    scenes = {'iremel':'mountain','aigir':'mountain','zyuratkul':'water','inzer':'water','kapova':'cave','nugush':'water','pavlovka':'water','yangantau':'autumn'}
    for region, scene in scenes.items():
        source = files[region].read_text(encoding='utf-8')
        for key in set(re.findall(r"media\('([^']+)'\)", source) + re.findall(r'/seed/([\w-]+)/', source)):
            chosen = 'winter' if key.startswith('aigir-w-') else 'cave' if key.startswith('zyuratkul-c-') else 'mountain' if key.startswith('inzer-t-') else scene
            illustration(key, chosen)
    for key in set(re.findall(r"media\('([^']+)'\)", (ROOT/'src/data/reviews.ts').read_text(encoding='utf-8')) + re.findall(r'/seed/([\w-]+)/', (ROOT/'src/data/reviews.ts').read_text(encoding='utf-8'))):
        illustration(key, list(scenes.values())[int(key.split('-')[1]) % len(scenes)])
    for i, scene in enumerate(('mountain','water','autumn'),1):
        illustration(f'trip-{i}', scene)
    for i, scene in enumerate(('water','cave','autumn','winter'),1):
        illustration(f'group-{i}', scene)
    illustration('hero', 'mountain', hero=True)
    print(f'{len(list(ART.glob("*.svg")))} SVG illustrations')
