# Photo Upload & Memory Gallery Enhancement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Process, enhance, and upload all 9 user images into the birthday website's photo archive with custom color/lighting adjustments and interactive gallery UX.

**Architecture:** Python Pillow pipeline for watermark removal, color grading, exposure lifting, and resolution upscaling into `public/photos/`; configuration update in `src/config/birthdayData.js` with heartfelt captions; UX refinement in `src/components/MemoryWall.jsx` for portrait Polaroid framing and modal carousel navigation.

**Tech Stack:** React 19, Vite, Tailwind CSS, Lucide React, Python (Pillow 13.0).

---

## Tasks

- [x] **Task 1: Process and optimize the 9 uploaded photos**
  - Clean watermark from Photo 1 using surrounding grass patch synthesis
  - Apply exposure compensation and shadow lift to underexposed photos (Photo 4, Photo 6)
  - Upscale and sharpen low-resolution photo (Photo 3)
  - Color-grade all 9 images with warm skin tones, crisp vibrancy, and contrast balance
  - Save as `public/photos/photo1.jpg` through `photo9.jpg`

- [x] **Task 2: Configure birthday data with 9 memories**
  - Update `birthdayData.photos` array in `src/config/birthdayData.js` with all 9 photos
  - Add affectionate and charming titles, captions, and dates tailored to Coco's personality
  - Add custom `objectPosition`, `rotation`, and `tapeColor` attributes for each item

- [x] **Task 3: Refine Polaroid display & Modal gallery in MemoryWall**
  - Update Polaroid image container in `src/components/MemoryWall.jsx` to portrait 4:5 ratio
  - Support `item.objectPosition` so faces are framed perfectly
  - Fix modal popup from 16:9 landscape crop to responsive portrait view with `object-contain`
  - Add Next/Previous carousel buttons and keyboard navigation in modal

- [x] **Task 4: Build verification & test**
  - Run `npm run build` to confirm zero compilation errors
  - Validate all 9 image paths and sizes
