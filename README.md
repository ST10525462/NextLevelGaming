
# Next Level Gaming & Esports Arena — Enterprise Web Application

A full-stack client-side web application built with **HTML5**, **Advanced CSS3 (Dark Synthwave Aesthetic)**, and native **ES6+ JavaScript**, engineered specifically for modern competitive esports, team training, private events, and casual gaming at Rosebank, Johannesburg.

---

## 🌟 Executive Summary & Vision

**Next Level Gaming** represents South Africa’s benchmark competitive gaming ecosystem. Located in Rosebank, Johannesburg, the physical hub houses tournament-grade machines, gigabit dedicated fiber lines, VR racing simulators, and immersive event suites. 

The web portal functions as an interactive frontend application enabling visitors to evaluate hardware tier offerings, run complex fee calculations with live tier-discounting engines, navigate interactive maps, and complete sanitized bookings. The platform delivers enterprise-grade performance, responsive multi-column layouts, strict data sanitization, and full visual accessibility.

---

## 🚀 Repository & Demonstration Links

- **YouTube Video Demonstration:** 👉 [Watch the Production Video Demo](https://youtu.be/5DQ1MI37tNk?si=4smkRAJG_rLA-Puq)
- **GitHub Repository:** 👉 [Access Source Code Repository](https://github.com/EMKNDW/xhaw5112-wil-g2-2026-wil-g2-website-st10525462.git)

---

## 🎨 UI/UX Architecture & Technical Styling System

### 1. Color System & Design Tokens (`styles.css`)
The visual identity uses custom CSS custom properties (`:root`) structured around a high-contrast dark synthwave aesthetic optimized for low-eyestrain readability:

```css
:root {
  --bg-main: #0a0c10;         /* Base background canvas */
  --bg-card: #121620;         /* Elevated container background */
  --bg-input: #1a202c;        /* Input background fill */
  --accent-cyan: #00f0ff;     /* Primary neon highlight & borders */
  --accent-purple: #b000ff;   /* Secondary accent & section tags */
  --accent-orange: #ff6000;   /* Call-to-action buttons */
  --text-main: #ffffff;       /* High-contrast body text */
  --text-muted: #a0aec0;      /* Subtitles & metadata text */
  --border-color: #2d3748;    /* Default container structural lines */
}

```

### 2. Layout Modules & Responsive Grid System

* **Pure CSS Grid Engines:** Primary interfaces utilize responsive CSS Grid layouts (`grid-template-columns: repeat(4, 1fr);` for catalog cards and `grid-template-columns: 1.2fr 1fr 1.2fr;` for 3-column contact dashboards) to maintain strict alignment across viewports.
* **Header & Navigation Bar:** Positioned statically with a multi-stop gradient overlay (`linear-gradient(90deg, #0a0c10, #0d1b3e, #2a0845)`). Features hover text-glow box shadows and active-page route highlighting.
* **Script-Free CSS Dropdown Menu:** Built using CSS `:focus-within` and `:hover` pseudoclass selectors, allowing instant, keyboard-accessible navigation to individual packages without JavaScript DOM overhead.
* **Component Isolation & Keyframe Animation:** Includes a dedicated keyframe animation (`fadeIn`) applied strictly to the `<main>` structural wrapper to deliver clean fade-in transitions without triggering header or navigation redrawing.

---

## 🖥️ In-Depth Screen Specifications & Functional Architecture

### 1. Global Header & Persistent Navigation

* **UI Structure:** Incorporates the circular venue emblem (`logo.jpeg`), glowing neon branding text, main page navigation links (*Home*, *About Us*, *Packages Dropdown*, *Calculate Fees*, *Contact*), and a high-priority orange CTA button (`.btn-book-station`).
* **Functionality:** Provides unified site-wide routing, keyboard navigation tab-indexing (`tabindex="0"`), and instant jump links to station booking.

### 2. Home Dashboard (`index.html`)

* **UI Structure:** Hero banner featuring glowing ambient text paired with a 3-column feature grid showcasing *Casual Gaming*, *Esports Tournaments*, and *Private Events*.
* **Functionality:** Serves as the primary user onboarding screen, providing direct CTA links to fee calculations and package specifications.

### 3. All Packages Catalog (`packages.html`) & 7 Sub-Pages

* **UI Structure:** 4-column card grid detailing all venue pass tiers. Each card highlights price badges, duration limits, technical equipment lists, and action buttons:
* **All Packages Catalog (`packages.html`):** Overview of all venue passes.
* **Ultimate Gamer Pass (`ultimate-gamer.html`):** RTX 4090 rigs + 360Hz monitors.
* **VIP Gaming Experience (`vip-gaming.html`):** Private room + catering + 4K OLED.
* **Esports Training Package (`esports-training.html`):** 5-v-5 squad bootcamp layout.
* **Birthday Party Package (`birthday-party.html`):** Multi-rig lounge + VR access.
* **Virtual Reality Experience (`vr-experience.html`):** Full HMD motion rigs.
* **Racing Simulator Challenge (`racing-sim.html`):** Force-feedback wheel rigs.
* **Escape Room Challenge (`escape-room.html`):** Interactive puzzle chambers.


* **Functionality:** Informs users of equipment specifications, group allowances, and base rates before they proceed to checkout calculations.

### 4. Fee Estimator & Station Booking Portal (`calculate-fees.html`)

* **UI Structure:** A 2-column layout split into a Form Input Container (`.form-box`) on the left and a Live Summary Dashboard (`.summary-box`) on the right.
* **Functionality:**
* *Manual Execution:* Fee calculation is triggered explicitly by clicking the **"CALCULATE FEE"** button, looping through selected inputs without resetting form data.
* *Tiered Discount Calculations:* Dynamically tallies total player volume and applies discounts:
* `1–3 Players`: Base price (0% discount)
* `4–7 Players`: 5% Group Discount
* `8+ Players`: 10% Esports Team Discount


* *Multi-Package Summary Breakdown:* Dynamically renders selected package rows, subtotal amounts per item, player counts, total base price, discount amount, and net estimated total.



### 5. About Us & Venue Legacy (`about.html`)

* **UI Structure:** Styled dark containers outlining the facility history since 2023, gigabit fiber network infrastructure, hardware upgrade timelines, and developer credits.
* **Functionality:** Builds consumer trust and details venue hardware performance specifications.

### 6. Contact & Interactive Location Screen (`contact.html`)

* **UI Structure:** A balanced 3-column grid featuring:
* *Column 1:* User Inquiry Form (*Name*, *Email*, *Phone*, *Message*).
* *Column 2:* Physical Venue Details & Operating Hours Table.
* *Column 3:* OpenStreetMap Interactive View Container (`#map-container`).


* **Functionality:** Dynamically injects the OpenStreetMap API iframe via script, applies dark-mode CSS filter inversion (`invert(90%) hue-rotate(180deg)`), pins exact Rosebank coordinates (`marker=-26.145,28.040`), and processes validated message transmissions.

---

## 📱 Detailed JavaScript Engine Breakdown (`_javascript/script.js`)

```
                          [User Input / Action]
                                    │
            ┌───────────────────────┴───────────────────────┐
            ▼                                               ▼
   [Real-Time Listeners]                           [Form Submit Action]
    - Phone input: Strips \D                        - Reset error spans (.inline-error)
    - Date min set: todayStr                        - Evaluate input states
            │                                               │
            │                         ┌─────────────────────┴─────────────────────┐
            │                         ▼                                           ▼
            │               [All / Required Empty?]                     [Data Format Violations?]
            │                         │                                           │
            │                YES ─────┴───── NO                          YES ─────┴───── NO
            │                 │              │                            │              │
            │                 ▼              │                            ▼              │
            │     [Show Inline Warning ⚠️]   │                  [Pop-Up alert() Error]   │
            │     [Block Submission]         │                  [Block Submission]       │
            │                                │                                           │
            └────────────────────────────────┼───────────────────────────────────────────┘
                                             │
                                             ▼
                                 [Execute Calculation]
                                 [Replace Form with DOM]
                                 [Neon Success Screen Card]

```

### 1. Real-Time Phone Number Sanitization

To maintain database-ready telephone records, an `input` event listener monitors phone fields (`#phone-number`, `#contact-phone`) and strips any non-numeric character instantaneously:

```javascript
input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, '');
});

```

### 2. Strict Date Format & Past-Date Constraint

* **Current Date Floor:** Dynamically queries system date (`new Date().toISOString().split('T')[0]`) and applies a `min` attribute constraint to the date field.
* **Format Validation:** Form submit handlers enforce a strict 4-digit year format (`YYYY-MM-DD`) via regex `/^\d{4}-\d{2}-\d{2}$/` and throw an explicit pop-up alert if a user inputs a past year or malformed string.

### 3. Two-Tiered Error Handling Paradigm

The application separates missing required inputs from incorrect data formatting:

1. **Tier 1 — Inline Exclamation Warnings (`⚠️`):** When inputs are missing (whether all fields are blank or a single field is omitted), targeted warning elements (`#err-[field-id]`) display inline below the inputs (`display: block`).
2. **Tier 2 — Pop-Up Alert Windows (`alert()`):** Format errors (such as invalid email syntax matching `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, phone numbers under 10 digits, or past date entries) trigger immediate pop-up dialogs to inform the user.

### 4. DOM Success Screen Mutation

Upon successful form submission, the JavaScript engine replaces the multi-column form structure (`.form-layout`) with a custom neon-green success card (`border-color: #00ff64; box-shadow: 0 0 30px rgba(0, 255, 100, 0.2)`). The card displays an itemized summary of the booking or message, along with reload and navigation options.

### 5. Dynamic Map API DOM Injection

Rather than hardcoding map elements in HTML, JavaScript dynamically creates and appends the dark-mode OpenStreetMap container onto `#map-container` upon page load:

```javascript
const mapContainer = document.getElementById("map-container");
if (mapContainer) {
    mapContainer.innerHTML = `
        <iframe width="100%" height="100%" frameborder="0" scrolling="no" 
            src="[https://www.openstreetmap.org/export/embed.html?bbox=28.030%2C-26.150%2C28.050%2C-26.140&amp;layer=mapnik&amp;marker=-26.145%2C28.040](https://www.openstreetmap.org/export/embed.html?bbox=28.030%2C-26.150%2C28.050%2C-26.140&amp;layer=mapnik&amp;marker=-26.145%2C28.040)" 
            style="border: 0; filter: invert(90%) hue-rotate(180deg);">
        </iframe>`;
}

```

---

## 🛠️ Technology Stack & Directory Architecture

* **Markup Language:** Pure HTML5 (Semantic Structure, Form Controls, Data Attributes)
* **Styling Architecture:** CSS3 (Variables, Flexbox, CSS Grid, Keyframe Animations, Synthwave Neon Palette)
* **Scripting Engine:** Native JavaScript (ES6+, DOM Mutation, Event Listeners, Regular Expressions)
* **Map Integration:** OpenStreetMap Embed API (JavaScript Injected with CSS Dark-Mode Inversion)

```text
esports-arena-web-app/
├── index.html                  # Home Dashboard
├── about.html                  # About Us & Arena History
├── packages.html               # All Packages Catalog
├── ultimate-gamer.html         # Package 1 Landing Screen
├── vip-gaming.html             # Package 2 Landing Screen
├── esports-training.html       # Package 3 Landing Screen
├── birthday-party.html         # Package 4 Landing Screen
├── vr-experience.html          # Package 5 Landing Screen
├── racing-sim.html             # Package 6 Landing Screen
├── escape-room.html            # Package 7 Landing Screen
├── calculate-fees.html         # Fee Calculation & Booking Screen
├── contact.html                # Contact Us & Location Screen
├── styles.css                  # Master CSS Stylesheet
├── _javascript/
│   └── script.js               # Application Script Engine
└── _image-assets/
    └── logo.jpeg               # Next Level Gaming Arena Emblem

```

---

## 👥 Project Team & Responsibilities

* **Jordan Hayley Naidoo** – Project Leader, Lead Frontend Architect & JavaScript Engineer
* **Drénay Venelle Murugas** – Project Secretary, Quality Assurance & Technical Co-Developer
* **Amelia Mostert** – Lead UI/UX & Asset Designer

---

## 📄 Academic References & Attributions (Harvard Anglia)

* **Google Gemini, 2026.** *Next Level Gaming Web Application Code Architecture & Frontend Script Refinement*. Code generated via AI Collaboration. Large Language Model. Available at: [https://gemini.google.com](https://gemini.google.com) [Accessed 26 October 2026].
* **Meyer, E., 2011.** *CSS Reset & Standard Universal Box Sizing*. [online] Meyerweb. Available at: [https://meyerweb.com/eric/tools/css/reset/](https://meyerweb.com/eric/tools/css/reset/) [Accessed 5 September 2026].
* **Mozilla Developer Network (MDN), 2024.** *HTML: HyperText Markup Language Specifications*. MDN Web Docs. Available at: [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) [Accessed 5 September 2026].
* **Mozilla Developer Network (MDN), 2025a.** *CSS Menu Techniques without JavaScript*. MDN Web Docs. Available at: [https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook/Dropdown_menu](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook/Dropdown_menu) [Accessed 10 October 2026].
* **Mozilla Developer Network (MDN), 2025b.** *Introduction to the Document Object Model (DOM)*. MDN Web Docs. Available at: [https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) [Accessed 12 October 2026].
* **OpenStreetMap Contributors, 2026.** *OpenStreetMap Embed API Integration & Marker Location*. OpenStreetMap Foundation. Available at: [https://www.openstreetmap.org/](https://www.openstreetmap.org/) [Accessed 15 October 2026].
* **World Wide Web Consortium (W3C), 2023.** *CSS Positioned Layout Module Level 3*. W3C Recommendation. Available at: [https://www.w3.org/TR/css-position-3/](https://www.w3.org/TR/css-position-3/) [Accessed 5 September 2026].
* **World Wide Web Consortium (W3C), 2024a.** *CSS Custom Properties Module Level 1*. W3C Technical Report. Available at: [https://www.w3.org/TR/css-variables-1/](https://www.w3.org/TR/css-variables-1/) [Accessed 18 September 2026].
* **World Wide Web Consortium (W3C), 2024b.** *CSS Grid Layout Module Level 1*. W3C Technical Report. Available at: [https://www.w3.org/TR/css-grid-1/](https://www.w3.org/TR/css-grid-1/) [Accessed 18 September 2026].
* **World Wide Web Consortium (W3C), 2024c.** *HTML5 Form Validation & Constraints*. W3C Specifications. Available at: [https://www.w3.org/TR/html52/sec-forms.html](https://www.w3.org/TR/html52/sec-forms.html) [Accessed 20 October 2026].
* **W3Schools, 2024.** *HTML5 Tutorial & Forms*. W3Schools Online Web Tutorials. Available at: [https://www.w3schools.com/html/](https://www.w3schools.com/html/) [Accessed 5 September 2026].

```

```