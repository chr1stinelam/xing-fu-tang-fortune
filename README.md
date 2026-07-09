# 🥤 Xing Fu Tang Fortune Sticks (幸福堂求籤)

An interactive web app that recreates the fortune-stick drawing experience from Xing Fu Tang (幸福堂), the Taiwanese bubble tea chain known for its in-store "求籤" (fortune stick) tradition — reimagined as a playful, tactile digital ritual.

**[Live Demo](https://xing-fu-tang-fortune.vercel.app/)

---

## What it is

Instead of a static "click for a random fortune" button, this project simulates the *physical* experience of drawing a fortune stick at a real temple or Xing Fu Tang:

1. **The bucket** — a cluster of wooden fortune sticks sits in a canister. As your cursor moves nearby, the sticks shift and tilt slightly, like you're actually reaching in and feeling around for one.
2. **The draw** — clicking a stick lifts it out of the bucket and reveals a randomly drawn number (1–100).
3. **The cabinet** — the scene transitions to a wall of small wooden drawers, styled after the real apothecary-style fortune cabinets, with the matching drawer highlighting and sliding open.
4. **The fortune** — a fortune slip is revealed in the authentic Xing Fu Tang format: luck level, an English fortune, and a matching Chinese verse.

## Tech Stack

- **React** — component structure and state management across the multi-screen flow (bucket → cabinet → reveal)
- **Tailwind CSS** — styling, tuned to match real wood tones, red accents, and lacquer textures from reference photography
- **Framer Motion** — physics-based animation for the stick-shifting, draw, and drawer-opening sequences
- **Structured JSON content model** — 100 fortune entries (`fortunes.json`), each with a matched English/Chinese pair and a weighted luck-level distribution modeled after real fortune stick sets (most fortunes land in the "average/good" range; true extremes are rare, mirroring the actual ratio at real temples)

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── FortuneBucket.jsx     # stick cluster + cursor-reactive motion
│   │   ├── FortuneCabinet.jsx    # drawer grid + reveal animation
│   │   └── FortuneCard.jsx       # final fortune slip display
│   ├── data/
│   │   └── fortunes.json         # 100 fortune entries, keyed 1–100
│   └── App.jsx
└── README.md
```

## Getting Started

```bash
npm install
npm run dev
```

## Data Model

Each fortune entry follows this shape:

```json
{
  "number": 1,
  "luckLevel": "Good Luck",
  "luckLevelZh": "上籤",
  "category": "career",
  "englishFortune": "...",
  "chinesePoem": "..."
}
```

## Skills & Concepts Demonstrated

`Frontend Development` `React` `Framer Motion / Animation Design` `Interaction Design` `UX Prototyping` `Content Modeling` `Bilingual/Localized Content Design` `Cultural Product Design` `State Management` `Product Thinking` `Data Structuring (JSON)`

## Future Improvements

- Save/share a drawn fortune as an image
- "Fortune history" — track past draws in local storage
- Sound design for the stick draw and drawer open
- Additional themed fortune sets (career-only, love-only decks)
