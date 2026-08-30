# Wonders Scents - Luxury Fragrance & Pure Perfume Oils Storefront

A modern, high-performance e-commerce web application engineered for Wonders Scents, an authentic luxury fragrance brand based in Nigeria. The platform showcases designer perfumes, 100% uncut pure perfume oils, body mists, deodorants, and professional perfume formulation training masterclasses.

---

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Asset Management & Optimization](#asset-management--optimization)
- [Production Deployment](#production-deployment)
- [Brand & Contact Information](#brand--contact-information)

---

## Overview

Wonders Scents delivers an editorial, luxury digital storefront designed to convert visitors through clear product storytelling, detailed olfactory note breakdowns (top, heart, and base notes), curated occasion recommendations, and direct WhatsApp concierge order placement.

---

## Core Features

### 1. Curated Fragrance Catalog
- Multi-category navigation across Men's Collection, Women's Collection, Unisex Niche Fragrances, and Pure Perfume Oils.
- Dual-view presentation with bottle and packaging hover interactions.
- Comprehensive product details including olfactory pyramid, family classification, and "When to Wear" occasion tags.

### 2. Pure Perfume Oils Archive
- Dedicated showcase for 100% uncut, alcohol-free perfume oil concentrates with extreme longevity.
- Distinct presentation layouts for multi-bottle collections (full-bleed framing) and individual flacons (centered studio staging).
- Clean two-line preview summaries with modal and full-page fragrance profiles.

### 3. Interactive Discovery & Live Search
- Real-time client-side search across brands, fragrance notes, categories, and keywords.
- Dynamic tag filtering with category badges.

### 4. Streamlined WhatsApp Concierge Checkout
- Frictionless cart management supporting multi-size selection (3ml, 6ml, 30ml, 50ml, 100ml) and quantity adjustments.
- Automated generation of structured WhatsApp order messages containing itemized products, delivery method, customer details, and recipient address.

### 5. Search Engine Optimization & Social Sharing
- Complete JSON-LD Structured Data Schema implementation (Organization, WebSite, SearchAction, ItemList, SiteNavigationElement).
- OpenGraph and Twitter card metadata for link previews on WhatsApp, iMessage, Instagram, Facebook, and Twitter/X.
- Custom brand favicon and Apple touch icons for multi-device bookmarking.

### 6. Perfume Formulation Academy
- Dedicated registration and waitlist portal for practical perfume formulation and business training programs.

---

## Technology Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4
- **Carousel & Sliders:** Embla Carousel React
- **Animations:** Framer Motion & CSS keyframe transitions
- **Icons:** Lucide React
- **Image Processing & Compression:** Python (Pillow, NumPy, FFmpeg)

---

## Project Architecture

```
wondersscents/
├── public/
│   ├── images/
│   │   ├── hero/          # Animated floating hero showcase assets
│   │   ├── men/           # Men's perfumes, sprays, and roll-ons
│   │   ├── women/         # Women's perfumes, mists, sprays, and roll-ons
│   │   ├── unisex/        # Unisex niche perfumes, sprays, and roll-ons
│   │   ├── oils/          # Pure perfume oils and roll-on collections
│   │   └── general/       # Brand logo, banner graphics, and icons
│   ├── favicon.ico        # Standard browser favicon
│   ├── favicon.png        # High-resolution PNG favicon
│   └── signature_scents_video.mp4
├── src/
│   ├── components/        # Modular page views, navigation, modals, and drawers
│   │   ├── AboutPage.tsx
│   │   ├── AllCollectionsPage.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── ContactPage.tsx
│   │   ├── Footer.tsx
│   │   ├── HomePage.tsx
│   │   ├── MensCollectionPage.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── PurePerfumeOilsPage.tsx
│   │   ├── SearchModal.tsx
│   │   ├── TrainingPage.tsx
│   │   ├── UnisexCollectionPage.tsx
│   │   └── WomensCollectionPage.tsx
│   ├── data/              # Master fragrance database and metadata
│   │   └── fragranceDatabase.ts
│   ├── hooks/             # Custom state management and scroll hooks
│   │   └── useAppState.ts
│   ├── services/          # Product service abstraction layer
│   │   └── productService.ts
│   ├── types/             # TypeScript type definitions and interfaces
│   │   └── index.ts
│   ├── App.tsx            # Main application router and state coordinator
│   └── main.tsx           # React DOM root entry point
├── index.html             # HTML entry with complete SEO, OpenGraph & JSON-LD schema
├── package.json           # Project dependencies and build scripts
├── tsconfig.json          # TypeScript compiler configuration
└── vite.config.ts         # Vite bundler configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm, yarn, or pnpm
- Python 3.8+ (for asset processing and compression scripts)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wondersscents.git
   cd wondersscents
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## Asset Management & Optimization

The repository includes automation scripts for asset processing and compression:

- **Folder Organization:**
  ```bash
  python organize_folders.py
  ```
  Sorts raw public assets into dedicated subdirectories.

- **Path Synchronization:**
  ```bash
  python update_codebase_paths.py
  ```
  Synchronizes all asset references across TypeScript components.

- **Lossless Asset & Video Compression:**
  ```bash
  python compress_assets.py
  ```
  Executes Level-9 PNG deflation, progressive JPEG optimization, WebP conversion, and MP4 faststart streaming optimization.

---

## Production Deployment

To generate an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The compiled output will be generated inside the `dist/` directory, ready for zero-configuration hosting on platforms such as Vercel, Netlify, Cloudflare Pages, or AWS S3.

---

## Brand & Contact Information

- **Brand:** Wonders Scents
- **Location:** Lagos, Nigeria
- **WhatsApp Concierge:** +234 814 562 0271
- **Tagline:** Smell Nice, Feel Good, Look Good.

---

## License

All brand assets, product photography, and trademarks are proprietary to Wonders Scents. Source code is distributed under the MIT License.
