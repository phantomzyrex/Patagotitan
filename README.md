# Patagotitan — Titan of the Floodplain Forests

An Awwwards-level, museum-grade single-page paleontological portfolio and interactive monograph exploring ***Patagotitan mayorum*** and its Early Cretaceous (`~101.6 Ma`) seasonal conifer floodplain forest in the Cerro Castaño Member (Cerro Barcino Formation, Chubut Province, Patagonia, Argentina).

---

## 1. Folder Structure

```text
/
├── index.html                          # Entry HTML with Marcellus & Jost fonts + SEO metadata
├── metadata.json                       # Applet metadata
├── package.json                        # React 19, Vite, Tailwind CSS v4, GSAP, Lenis
├── public/
│   └── assets/
│       ├── patagotitan-hero.png        # Transparent Patagotitan cutout (Hero foreground subject)
│       ├── patagotitan-side.png        # Specimen side profile (Section 04 Anatomy Hotspots)
│       ├── gallery-01.jpg ... 06.jpg   # Optional custom gallery plates (auto-falls back to SVG plates)
│       └── aistudio/                   # Original uploaded transparent cutout asset
└── src/
    ├── main.tsx                        # React root mount
    ├── App.tsx                         # Main application shell, Lenis smooth scroll, SeasonGauge state
    ├── index.css                       # Floodplain colour tokens (--glow to --floor), hero radial gradient & animations
    ├── styles/
    │   └── tokens.ts                   # Centralised colour, typography, spacing & parallax design tokens + fit-text math
    ├── utils/
    │   └── fitText.ts                  # Responsive useFitText hook (~85% viewport width wordmark sizing)
    ├── data/
    │   ├── patagotitanData.ts          # All peer-reviewed paleontological content & pure calculation helpers
    │   └── patagotitanData.test.ts     # Node test runner unit tests for scientific rules & state calculations
    └── components/
        ├── Loader.tsx                  # Minimal sheet-flood water bar & 0–100 counter
        ├── CustomCursor.tsx            # Desktop translucent warm-peach cursor ring
        ├── Nav.tsx                     # 3-part reference navigation (PATAGOTITAN | MENU | CONTACT)
        ├── MenuOverlay.tsx             # Full-screen deep conifer (#081C17) chapter overlay (01–13)
        ├── SeasonGauge.tsx             # Vertical right-edge seasonal gauge (DRY -> TRANSITION -> WET)
        ├── FloodplainAtmosphere.tsx    # Multi-layer canvas pollen, spores, volcanic ash & falling conifer foliage
        ├── Hero.tsx                    # 01 HERO — 100vh rounded frame, wordmark, graded creature cutout, water & conifers
        ├── Overview.tsx                # 02 OVERVIEW — "The Patagonian Giant" & 9 osteological/geological stat cards
        ├── Timeline.tsx                # 03 DISCOVERY AND HISTORY — Filterable 13-milestone vertical timeline (2010–Today)
        ├── AnatomyHotspots.tsx         # 04 ANATOMY — 10 interactive hotspots + dashed skull reconstruction overlay
        ├── SizeCompare.tsx             # 05 SIZE COMPARISON — Interactive SVG scale chart (31m vs 37m + Argentinosaurus)
        ├── DietLifeHistory.tsx         # 06 DIET AND LIFE HISTORY — Hypothetical food web & 3.43m 4-layer burial inspector
        ├── FloodplainMap.tsx           # 07 HABITAT AND DISTRIBUTION — Dry/Wet phase slider, fauna & Patagonia/Casts map
        ├── Taxonomy.tsx                # 08 CLASSIFICATION AND SPECIES — Cladistic ranks & 2017–2022 phylogeny slider
        ├── EvolutionExtinction.tsx     # 09 EVOLUTION AND EXTINCTION — 125–66 Ma timeline & Cerro Barcino rock-layer strip
        ├── MythReality.tsx             # 10 MYTH vs REALITY — 6 interactive flip cards
        ├── Gallery.tsx                 # 11 GALLERY — Horizontal drag-scroll gallery & Lightbox modal
        ├── FastFactsSources.tsx        # 12 FAST FACTS AND SOURCES — 8 essential facts & searchable 18-source bibliography
        └── Footer.tsx                  # 13 CONTACT AND FOOTER — "LET'S TALK" & "Back to the Dry Season" scroll action
```

---

## 2. Where to Drop Your Images

Place your custom image files inside `/public/assets/`:

1. **Hero Transparent Cutout**: `/public/assets/patagotitan-hero.png` *(already populated from your uploaded transparent PNG)*.
2. **Anatomy Side Profile**: `/public/assets/patagotitan-side.png` *(already populated from your uploaded PNG; can be replaced with a strict lateral profile at any time)*.
3. **Gallery Plates**: `/public/assets/gallery-01.jpg` through `/public/assets/gallery-06.jpg`.
   - If any of `gallery-01.jpg` ... `gallery-06.jpg` are not replaced with custom photographs, Section 11 automatically displays clearly labelled archival SVG paleontological plates graded to the apricot-sage-conifer palette.

---

## 3. Install, Run & Test Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (http://localhost:3000)
npm run dev

# 3. Run unit tests (Node built-in test runner via tsx)
npx --yes tsx --test src/data/patagotitanData.test.ts

# 4. Build for production
npm run build
```
