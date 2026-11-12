# 💖 Bestie's Birthday Celebration Website

A modern, interactive 3D birthday celebration website built with React, Vite, Tailwind CSS, Three.js, and Framer Motion.

## ✨ Features
- **Interactive 3D Gift Box (Three.js)**: 3D box that tilts with mouse movement and bursts into celebration confetti when clicked.
- **Ambient Melody Player**: Built-in soothing lo-fi birthday melody using Web Audio API (zero external broken links, instant play).
- **Polaroid Memory Wall**: 3D tilt photo cards with aesthetic placeholder frames ready for real pictures.
- **Heartfelt & Flirty Love Letters**: Interactive envelopes with tabs: Pure Heart, Flirty Teasing, Partners in Crime, and Birthday Vow.
- **Virtual Birthday Cake**: 5 glowing candles that blow out on click with smoke animation, fanfare sound, and star wishes.
- **10 Reasons Why You're Loved**: Claymorphic reason cards with micro-animations.
- **Interactive Wish Capsule**: Read sweet wishes and drop custom wishes into the jar.

## 🚀 Quick Start
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## 🎨 How to Customize Content & Add Photos
Edit `src/config/birthdayData.js`:
- `bestieName`: Change "Bestie" to your bestie's real name or nickname.
- `photos`: Add your photo files to `public/photos/` and set `src: "/photos/your_pic.jpg"`.
- `loveLetters`: Personalize the heartfelt and flirty messages.
- `reasonsWhy`: Add your custom inside jokes and memories.

## 🔒 Push to Private GitHub Repository
1. Create a new private repository on [GitHub](https://github.com/new).
2. Run in terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```
