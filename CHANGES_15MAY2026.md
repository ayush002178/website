# Odisha AI Website — Session Change Log
**Date:** 15 May 2026  
**Branch:** `test-prince`  
**Stack:** Vite + React, React Router DOM, Lucide React  

---

## Summary

This session achieved full-scale modernization and localization of the Odisha AI website. We implemented a complete bilingual (English/Odia) support system, built individual detail pages for all Conferences and Initiatives, replaced static assets with interactive React components, and resolved critical runtime bugs on the About and Footer sections.

---

## 1. Image Loading Fix

### Problem
All images on the site (hero, conference covers, initiative covers, timeline) were failing to load in the browser.

### Root Cause
Zola (the previous static site generator) stores public/static assets in a `static/` directory. Vite defaults to `public/` as its static root. Since the React app referenced images as `/images/...`, Vite could not locate them at runtime.

### Fix — `vite.config.js`
```diff
 export default defineConfig({
   plugins: [react()],
+  publicDir: 'static',   // serve Zola's static/ folder as Vite's public root
 })
```

**Effect:** All image paths like `/images/conference-covers/2025.webp`, `/images/initiatives/rathathon.webp`, `/images/index.webp`, `/images/odias_ai_ml_journey_dark_16x9.png` now resolve correctly without moving any files.

---

## 2. New Pages Created

### 2.1 `src/pages/Initiatives.jsx` (rebuilt)
- Replaced the old external-link version (which linked out to the live Zola site)
- All 9 initiative cards now use `<Link to="/initiatives/:slug">` — internal React Router navigation
- Added live **tag filter bar** with gradient active state (`All`, `education`, `genai`, `hackathon`, `odia`, `python`, `tools`, `discussion`, `event`, `twitter`)
- Per-card color-coded accent dots visible on the cover image (top-right)
- `ChevronRight` arrow on each card replaced the previous `ExternalLink` icon

### 2.2 `src/pages/Resources.jsx` (new)
- Three sections: Language AI · Odisha Govt Vision · Miscellaneous
- Each section has a color-coded icon header and hover-animated resource cards
- A "Contribute on GitHub" CTA banner at the bottom

### 2.3 `src/pages/Join.jsx` (new)
- Primary WhatsApp CTA card with decorative placeholder
- Six community channel cards (WhatsApp, Twitter/X, LinkedIn, YouTube, Instagram, GitHub)
- Per-card hover glow in each channel's brand color
- "Volunteer or Lead an Initiative?" CTA linking to `/initiatives`

### 2.4 `src/pages/Blogs.jsx` (rebuilt)
- Auto-loads markdown files from `content/blogs/` via Vite `import.meta.glob`
- Cards with gradient top bar, per-tag color chips, date display, arrow CTA
- Loading state with monospace placeholder text

### 2.5 `src/pages/BlogPost.jsx` (new)
- Full markdown reader using `react-markdown` + `remark-gfm`
- Back navigation, 404 fallback, tag chips, date display

### 2.6 `src/pages/ConferenceDetail.jsx` (new — major)
Full detail page for every conference, accessed via `/conferences/:slug`.

**Slugs:** `summit` · `regional-summit` · `2025` · `2024` · `2023` · `2022` · `2021` · `2020`

**Layout:**
- **Hero** — full-width image (`brightness(0.18)`) with heavy gradient overlay, status + type tags, large `h1` in Syne 800 with `text-shadow`, gradient accent bar beneath title
- **Content area** — title + date + location repeated as `h2` block (border-bottom divider) to guarantee visibility even if hero fails
- **Left column:** Theme quote · About paragraphs · Organizing Committee (avatar initial chips) · Invited Speakers grid · Hashtag CTA card
- **Right sidebar (sticky):** Date · Location · Status · Back button · Join CTA

**Data populated for:**
- Summit 2025 — 8 organizers, 3 invited speakers, hashtag
- 2025 Conference — theme, about, hashtag
- 2024, 2023, 2022, 2021, 2020 — theme, about paragraph, hashtag

### 2.7 `src/pages/InitiativeDetail.jsx` (new — major)
Full detail page for every initiative, accessed via `/initiatives/:slug`.

**Slugs:** `rathathon` · `ai-foundation-series` · `odiagenai` · `fdp` · `summer-school` · `ml-lecture-series` · `childrens-day` · `openodia` · `twitter-spaces`

**Layout:**
- **Hero** — full-width image (`brightness(0.18)`), color-matched radial glow, back breadcrumb, category tags, `h1` Syne 800, tagline, colored accent underline bar with glow shadow
- **Content area** — initiative name + tagline + tags repeated as `h2` header block below the hero
- **Left column:** Optional lead person card (avatar + LinkedIn link) · Content sections (emoji, heading, paragraphs) · Optional feature grid (OpenOdia's 8 features)
- **Right sidebar (sticky):** Started date · Category tags · External links · Back button

**Content sourced from live site** (`odishaai.org/initiatives/*`):
- Rathathon — 4 sections (About, How to Apply, Benefits, Partners)
- AI Foundation Series — 4 sections
- OdiaGenAI — 2 sections + 4 external links + Dr. Shantipriya Parida lead card
- FDP — 1 section + 3 external links + Dr. Shantipriya Parida lead card
- OpenOdia — 1 section + 8 features + 2 external links
- Summer School, Lecture Series, Children's Day, Twitter Spaces — content sections

---

## 3. Routing Updates — `src/App.jsx`

Two new parameterized routes added:

```diff
+ import ConferenceDetail from './pages/ConferenceDetail';
+ import InitiativeDetail from './pages/InitiativeDetail';

  <Route path="/conferences" element={<Events />} />
+ <Route path="/conferences/:slug" element={<ConferenceDetail />} />
  <Route path="/initiatives" element={<Initiatives />} />
+ <Route path="/initiatives/:slug" element={<InitiativeDetail />} />
```

---

## 4. Conferences List Page Rebuilt — `src/pages/Events.jsx`

Completely rewritten. Previous version used `onClick` expand/collapse cards. Now:
- Every card is a `<Link to="/conferences/:slug">` — navigates to the detail page
- Added short descriptive text for each conference
- "Next Up" green banner card at top links directly to `/conferences/summit`
- Image hover scales the cover photo (`transform: scale(1.05)`)
- Location displayed with 📍 emoji
- `ChevronRight` replaces the previous expand arrow

---

## 5. Page Title Visibility Fix

### Problem
The `h1` title in hero sections was hard to read against the dimmed images.

### Fix applied to `ConferenceDetail.jsx` and `InitiativeDetail.jsx`

| Property | Before | After |
|---|---|---|
| Image brightness | `0.25` | `0.18` |
| Gradient overlay | `#000 30%` → `rgba(0,0,0,0.4)` | `rgba(0,0,0,0.98) 0%` → `rgba(0,0,0,0.2) 100%` |
| h1 font-size | `clamp(1.8rem,4vw,3rem)` | `clamp(2rem,5vw,3.6rem)` |
| h1 font-weight | default | `800` Syne |
| text-shadow | `0 2px 20px...` | `0 2px 40px rgba(0,0,0,1), 0 0 80px rgba(0,0,0,0.9)` |
| Accent bar | none | gradient bar (conf) / colored glow bar (initiative) |

**Additionally:** Title is **repeated below the hero** in the content area as an `h2` block — guarantees name is always readable on the page regardless of image rendering.

---

## 6. About Page — Timeline Image Replaced

### Step 1 — Static image swap
```diff
- <img src="/images/OdiasInAITimeline.webp" style={{ maxHeight:450, objectFit:'cover' }} />
+ <img src="/images/odias_ai_ml_journey_dark_16x9.png" style={{ aspectRatio:'16/9', objectFit:'contain' }} />
```

### Step 2 — Replaced static image with coded React component
The entire `<img>` block replaced with `<JourneyTimeline />`.

---

## 7. New Component — `src/components/JourneyTimeline.jsx`

Fully coded interactive React timeline replacing the static PNG.

### Design specs
| Property | Value |
|---|---|
| Background | Deep space gradient `#0a0a16 → #0d0820 → #0a0a16` |
| Starfield | 32 randomized dots |
| Layout | 4 zigzag rows (L→R, R→L, L→R, R→L) with dashed connector lines + arrowheads |
| Year pills | Rounded pill, colored border, glow box-shadow |
| Cards | Dark glass `rgba(15,15,25,0.9)`, colored top border, hover glow |
| Animation | `IntersectionObserver` → staggered `opacity + translateY` on scroll |

### All 15 milestones

| Year | Title | Note |
|---|---|---|
| 2018 | First Steps | from original image |
| 2020 | Global Community | from original image |
| 2020 | First Global Conference | from original image |
| 2020 | Odia NLP | from original image |
| 2021 | AI/ML Lecture Series | from original image |
| 2021 | 2nd Global Conference | from original image |
| 2021 | Twitter Spaces | from original image |
| 2022 | Summer School & FDP | from original image |
| 2022 | 3rd Global Conference | from original image |
| 2023 | OdiaGenAI | from original image |
| 2023 | 4th Global Conference | from original image |
| 2024 | AI Foundation Series | **newly added** |
| 2024 | 5th Global Conference | **newly added** |
| 2025 | Rathathon | **newly added** |
| 2025 | AI Summit 2025 | **newly added** (marked "upcoming") |

---

## 8. All Files Modified / Created

| File | Action |
|---|---|
| `vite.config.js` | **Modified** — `publicDir: 'static'` |
| `src/App.jsx` | **Modified** — new imports + 2 routes |
| `src/pages/Events.jsx` | **Rebuilt** — cards → internal links + descriptions |
| `src/pages/Initiatives.jsx` | **Rebuilt** — cards → internal links + tag filter |
| `src/pages/ConferenceDetail.jsx` | **Created** — 8 conferences, full detail layout |
| `src/pages/InitiativeDetail.jsx` | **Created** — 9 initiatives, full detail layout |
| `src/pages/Resources.jsx` | **Created** — 3 sections, hover cards |
| `src/pages/Join.jsx` | **Created** — 6 community channel cards |
| `src/pages/Blogs.jsx` | **Rebuilt** — markdown-loading blog list |
| `src/pages/BlogPost.jsx` | **Created** — full markdown post reader |
| `src/pages/About.jsx` | **Modified** — timeline image → `JourneyTimeline` component |
| `src/components/JourneyTimeline.jsx` | **Created** — 15-milestone interactive coded timeline |

---

---

## 10. Full Site Localization (Bilingual Support)

Implemented a comprehensive translation system to support both **English** and **Odia** across the entire platform.

### 10.1 Localization Engine — `src/utils/LanguageContext.jsx`
- Created a `LanguageProvider` using React Context.
- Built a deep-nested translation dictionary for both languages.
- Implemented the `t()` translation hook with support for dotted key paths (e.g., `footer.brandDesc`).
- Persistent state: Language preference is saved to and restored from `localStorage`.

### 10.2 Global Coverage
The following components/pages were fully localized:
- **Navbar:** Navigation links and the language toggle button.
- **Footer:** Brand description, column headers, and internal/external links.
- **Home:** Hero section, statistical counters, and all section headings.
- **About:** Vision, Mission, Journey labels, and the interactive timeline.
- **Conferences/Initiatives:** Filtering tags, hero headers, and descriptive labels.
- **Resources/Join:** Help text, community channel descriptions, and CTA banners.
- **Blog:** List metadata, loading states, and "not found" fallbacks.

---

## 11. Critical Bug Fixes & Polish

### 11.1 About Page Runtime Fix
- **Problem:** The About page failed to load due to a `ReferenceError`.
- **Cause:** The `MapPin` icon from Lucide-React was used in the Chapters section but was missing from the import list.
- **Fix:** Added `MapPin` to the lucide-react import statement in `About.jsx`.

### 11.2 Footer Key Synchronization
- **Problem:** The footer brand description and column headers were invisible after the localization update.
- **Cause:** The component was calling `t('footer.brandDesc')` but the dictionary used `desc`.
- **Fix:** Synchronized dictionary keys in `LanguageContext.jsx` (`desc` → `brandDesc`, `col1` → `pages`, etc.) to match the production UI.

---

## 12. Build Status

```
✓ 2013 modules transformed
✓ built in ~850ms
✓ Zero errors
```

> [!NOTE]  
> A chunk size warning (`> 500 kB`) appears — advisory only, not an error. Can be resolved later with `React.lazy()` route-level code splitting.

---

*Generated — Odisha AI Website Modernization, 15 May 2026*
