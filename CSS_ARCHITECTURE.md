# CSS Architecture & Development Guide

## 🏗️ CSS File Structure Overview

The `styles.css` file is organized into logical sections for easy navigation and maintenance:

```
styles.css (2,100+ lines)
├── 1. CSS Variables & Root Styles (lines 1-120)
│   ├── Color palette
│   ├── Typography variables
│   ├── Spacing scale
│   └── Shadow & border definitions
│
├── 2. Global Base Styles (lines 121-300)
│   ├── * (universal selector)
│   ├── html & body
│   ├── Typography tags (h1-h4, p, a, etc.)
│   └── Form elements
│
├── 3. Header & Navigation (lines 301-500)
│   ├── header styling
│   ├── nav menu (mobile & desktop)
│   ├── .logo styling
│   └── .menu-toggle (hamburger button)
│
├── 4. Layout System (lines 501-650)
│   ├── .container (max-width constraint)
│   ├── .grid (CSS Grid)
│   ├── .flex (Flexbox)
│   └── Responsive grid templates
│
├── 5. Component Styles (lines 651-1200)
│   ├── Buttons (.btn)
│   ├── Cards (.card)
│   ├── Forms (.form-group, input, select)
│   ├── Image slider (.slider-container)
│   └── Badges (.badge)
│
├── 6. Page Specific Styles (lines 1201-1500)
│   ├── Hero section (.hero)
│   ├── Booking summary (.summary-box)
│   ├── FAQ accordion (.faq-item)
│   ├── Gallery items (.gallery-item)
│   └── Blog post styles (.blog-post)
│
├── 7. Utility Classes (lines 1501-1700)
│   ├── Text utilities (.text-center, .text-left, etc.)
│   ├── Spacing utilities (.mt-1, .mb-2, .px-3, etc.)
│   ├── Display utilities (.hidden, .visible, etc.)
│   └── Alignment utilities (.flex-center, .flex-between, etc.)
│
├── 8. Responsive Breakpoints (lines 1701-1900)
│   ├── @media (min-width: 768px) - Tablet styles
│   ├── @media (min-width: 1024px) - Desktop styles
│   └── @media (min-width: 1440px) - Large desktop styles
│
└── 9. Accessibility & Extra Features (lines 1901-2100)
    ├── @media (prefers-reduced-motion)
    ├── @media (prefers-color-scheme: dark)
    ├── Print styles (@media print)
    └── Focus & active states
```

---

## 📚 Using CSS Variables

All design values are stored in CSS variables in the `:root` section. This makes theming and maintenance simple.

### Color Variables

```css
:root {
  /* Primary Brand Colors */
  --primary-color: #2c5aa0;      /* Main action color */
  --primary-dark: #1e3f5a;       /* Darker shade */
  --primary-light: #4a7ba7;      /* Lighter shade */
  
  /* Secondary & Accent */
  --secondary-color: #ff6b6b;    /* Highlights & errors */
  --accent-color: #f39c12;       /* Gold accents */
  
  /* Utility Colors */
  --success-color: #27ae60;      /* Success states */
  --warning-color: #e74c3c;      /* Warnings & errors */
  --info-color: #3498db;         /* Information */
  
  /* Text Colors */
  --text-dark: #2c3e50;          /* Primary text */
  --text-light: #7f8c8d;         /* Secondary text */
  --text-muted: #95a5a6;         /* Muted text */
  
  /* Background Colors */
  --bg-white: #ffffff;           /* White background */
  --bg-light: #f8f9fa;           /* Light gray background */
  --bg-lighter: #ecf0f1;         /* Lighter gray background */
  
  /* Border & Shadow */
  --border-color: #ecf0f1;
  --shadow-light: 0px 2px 4px;
}
```

### How to Use Variables

```css
/* In any CSS rule, reference variables with var() */
.button {
  background-color: var(--primary-color);    /* Uses #2c5aa0 */
  color: var(--bg-white);                    /* Uses #ffffff */
  border: 1px solid var(--border-color);     /* Uses #ecf0f1 */
}

/* With fallback value */
.element {
  color: var(--text-dark, #2c3e50);          /* Falls back to #2c3e50 */
}

/* Using calc() with variables */
.section {
  padding: calc(var(--spacing-xl) + var(--spacing-md));
}
```

### Changing Theme (Override Variables)

```css
/* Override variables for dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --text-dark: #ecf0f1;
    --bg-white: #2c3e50;
    --bg-light: #34495e;
  }
}

/* Or for specific component */
.dark-mode {
  --text-dark: #ecf0f1;
  --bg-white: #2c3e50;
}
```

---

## 📐 Spacing Scale

All spacing follows an 8-point grid system:

```css
:root {
  --spacing-xs: 0.25rem;    /* 4px  - Tiny gaps */
  --spacing-sm: 0.5rem;     /* 8px  - Small gaps */
  --spacing-md: 1rem;       /* 16px - Standard padding */
  --spacing-lg: 1.5rem;     /* 24px - Card gap, medium section padding */
  --spacing-xl: 2rem;       /* 32px - Section padding, large gap */
  --spacing-2xl: 3rem;      /* 48px - Mobile section padding */
  --spacing-3xl: 4rem;      /* 64px - Desktop section padding */
}
```

### Examples

```css
.card {
  padding: var(--spacing-lg);          /* 24px padding */
  margin-bottom: var(--spacing-xl);    /* 32px below */
  gap: var(--spacing-md);              /* 16px gap between children */
}

.section {
  padding: var(--spacing-2xl) var(--spacing-md);  /* 48px top/bottom, 16px sides */
}
```

---

## 🎨 Component Library

### Button Variants

```css
/* Base button style */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: var(--bg-white);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: var(--fs-body);
  transition: all 0.3s ease;
  min-height: 44px;              /* Touch-friendly */
}

/* Button hover state */
.btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Secondary button */
.btn-secondary {
  background-color: var(--secondary-color);
}
.btn-secondary:hover {
  background-color: #ff5252;
}

/* Success button */
.btn-success {
  background-color: var(--success-color);
}

/* Outline button */
.btn-outline {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}
.btn-outline:hover {
  background-color: var(--primary-color);
  color: var(--bg-white);
}

/* Full width button */
.btn-full {
  width: 100%;
}

/* Disabled button */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Usage in HTML

```html
<button class="btn">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-success">Success Button</button>
<button class="btn btn-outline">Outline Button</button>
<button class="btn btn-full">Full Width Button</button>
<button class="btn" disabled>Disabled Button</button>
```

### Card Component

```css
.card {
  background-color: var(--bg-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-light);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-heavy);
  transform: translateY(-4px);
}

/* Card image section */
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-lg);
}

/* Card content sections */
.card-title {
  font-size: var(--fs-h3);
  color: var(--text-dark);
  margin-bottom: var(--spacing-md);
}

.card-meta {
  font-size: var(--fs-small);
  color: var(--text-light);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}
```

### Form Components

```css
/* Form group - wrapper for label + input */
.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
  color: var(--text-dark);
}

/* Input, textarea, select styling */
input, textarea, select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-family: inherit;
  font-size: var(--fs-body);
  transition: border-color 0.3s ease;
}

/* Focus state */
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
}

/* Error state */
.form-group.error input,
.form-group.error textarea,
.form-group.error select {
  border-color: var(--warning-color);
}

.error-message {
  color: var(--warning-color);
  font-size: var(--fs-small);
  margin-top: var(--spacing-xs);
  display: none;
}

.form-group.error .error-message {
  display: block;
}

/* Success state */
.form-group.success input {
  border-color: var(--success-color);
}
```

---

## 🔧 Flexbox Utilities

```css
/* Base flex container */
.flex {
  display: flex;
  gap: var(--spacing-md);
}

/* Column direction (stack vertically) */
.flex-col {
  flex-direction: column;
}

/* Row direction (side by side) - default */
.flex-row {
  flex-direction: row;
}

/* Center content */
.flex-center {
  justify-content: center;
  align-items: center;
}

/* Space between (justify-content) */
.flex-between {
  justify-content: space-between;
  align-items: center;
}

/* Space around */
.flex-around {
  justify-content: space-around;
  align-items: center;
}

/* Space evenly */
.flex-evenly {
  justify-content: space-evenly;
  align-items: center;
}

/* Wrap items */
.flex-wrap {
  flex-wrap: wrap;
}

/* Align items to start */
.flex-start {
  justify-content: flex-start;
  align-items: flex-start;
}

/* Align items to end */
.flex-end {
  justify-content: flex-end;
  align-items: flex-end;
}

/* Growing flex items */
.flex-grow {
  flex-grow: 1;
}

/* Different gaps */
.gap-sm { gap: var(--spacing-sm); }
.gap-md { gap: var(--spacing-md); }
.gap-lg { gap: var(--spacing-lg); }
.gap-xl { gap: var(--spacing-xl); }
```

### Flexbox Examples

```html
<!-- Center content horizontally and vertically -->
<div class="flex flex-center">
  <h1>Centered Heading</h1>
</div>

<!-- Space items apart horizontally -->
<div class="flex flex-between">
  <span>Left item</span>
  <span>Right item</span>
</div>

<!-- Stack items vertically with gap -->
<div class="flex flex-col gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Responsive: row on desktop, col on mobile -->
<div class="flex flex-col gap-lg">
  <!-- Mobile: stacks vertically -->
  <!-- At 768px: changes to row (add media query) -->
</div>
```

---

## 🔲 Grid Components

```css
/* Base grid */
.grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: 1fr;  /* Mobile: 1 column */
}

/* 2-column grid */
.grid-2 {
  grid-template-columns: 1fr;
}

/* 3-column grid */
.grid-3 {
  grid-template-columns: 1fr;
}

/* 4-column grid */
.grid-4 {
  grid-template-columns: 1fr;
}

/* TABLET - Change grids to 2 columns */
@media (min-width: 768px) {
  .grid-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}

/* DESKTOP - 3-4 column layouts */
@media (min-width: 1024px) {
  .grid-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
}

/* Auto-fit grid (fills available space) */
.grid-auto {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

---

## 🎯 Utility Classes

### Text Utilities

```css
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }

.text-bold { font-weight: 700; }
.text-medium { font-weight: 500; }
.text-normal { font-weight: 400; }

.text-uppercase { text-transform: uppercase; }
.text-lowercase { text-transform: lowercase; }
.text-capitalize { text-transform: capitalize; }

.text-small { font-size: var(--fs-small); }
.text-large { font-size: 1.15rem; }
.text-xlarge { font-size: 1.35rem; }

.text-primary { color: var(--primary-color); }
.text-secondary { color: var(--secondary-color); }
.text-success { color: var(--success-color); }
.text-warning { color: var(--warning-color); }
```

### Margin & Padding

```css
/* Margin Top */
.mt-1 { margin-top: var(--spacing-sm); }    /* 8px */
.mt-2 { margin-top: var(--spacing-md); }    /* 16px */
.mt-3 { margin-top: var(--spacing-lg); }    /* 24px */
.mt-4 { margin-top: var(--spacing-xl); }    /* 32px */

/* Margin Bottom */
.mb-1 { margin-bottom: var(--spacing-sm); }
.mb-2 { margin-bottom: var(--spacing-md); }
.mb-3 { margin-bottom: var(--spacing-lg); }
.mb-4 { margin-bottom: var(--spacing-xl); }

/* Margin Left/Right */
.ml-1 { margin-left: var(--spacing-sm); }
.mr-1 { margin-right: var(--spacing-sm); }
.mx-1 { margin-left: var(--spacing-sm); margin-right: var(--spacing-sm); }
.mx-auto { margin-left: auto; margin-right: auto; }

/* Padding */
.p-1 { padding: var(--spacing-sm); }
.p-2 { padding: var(--spacing-md); }
.p-3 { padding: var(--spacing-lg); }
.p-4 { padding: var(--spacing-xl); }

.px-1 { padding-left: var(--spacing-sm); padding-right: var(--spacing-sm); }
.py-1 { padding-top: var(--spacing-sm); padding-bottom: var(--spacing-sm); }
```

### Display & Visibility

```css
.hidden { display: none; }
.visible { display: block; }
.invisible { visibility: hidden; }

.inline { display: inline; }
.inline-block { display: inline-block; }
.block { display: block; }

/* Show/hide at specific breakpoints */
.hide-mobile { display: none; }
.hide-tablet { display: none; }

@media (min-width: 768px) {
  .hide-mobile { display: block; }
}

@media (max-width: 1023px) {
  .hide-desktop { display: none; }
}
```

### Common Utilities

```css
.rounded { border-radius: var(--border-radius-md); }
.rounded-lg { border-radius: var(--border-radius-lg); }
.rounded-full { border-radius: 9999px; }

.shadow { box-shadow: var(--shadow-light); }
.shadow-lg { box-shadow: var(--shadow-heavy); }
.shadow-none { box-shadow: none; }

.border { border: 1px solid var(--border-color); }
.border-top { border-top: 1px solid var(--border-color); }
.border-bottom { border-bottom: 1px solid var(--border-color); }

.opacity-50 { opacity: 0.5; }
.opacity-75 { opacity: 0.75; }
```

---

## 📱 Mobile-First Workflow

### Step 1: Create Mobile CSS First

```css
.my-component {
  display: flex;
  flex-direction: column;  /* Stack on mobile */
  padding: var(--spacing-md);
  font-size: var(--fs-body);
}
```

### Step 2: Enhance for Tablet

```css
@media (min-width: 768px) {
  .my-component {
    flex-direction: row;   /* Side by side on tablet */
    padding: var(--spacing-lg);
  }
}
```

### Step 3: Full Enhancement for Desktop

```css
@media (min-width: 1024px) {
  .my-component {
    padding: var(--spacing-2xl);
    font-size: 1.1rem;
  }
}
```

---

## ✨ Best Practices

### Do's ✅
- Use CSS variables for all design values
- Follow mobile-first approach
- Use semantic HTML classes
- Keep specificity low
- Use reusable utility classes
- Test at all breakpoints
- Use relative units (rem, %)

### Don'ts ❌
- Don't use inline styles
- Don't use !important (except in utility classes)
- Don't hardcode colors (use variables)
- Don't use fixed widths on responsive containers
- Don't forget about mobile users
- Don't nest selectors too deep
- Don't use px for typography

---

## 🔍 Debugging Tips

### Check what's being applied

```javascript
// In browser console
const element = document.querySelector('.my-element');
const styles = window.getComputedStyle(element);
console.log(styles.padding);
console.log(styles.display);
```

### Check if media query is active

```javascript
const isMobile = window.innerWidth < 768;
const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
const isDesktop = window.innerWidth >= 1024;
console.log(`isMobile: ${isMobile}, isTablet: ${isTablet}, isDesktop: ${isDesktop}`);
```

### View CSS variable values

```javascript
const root = document.documentElement;
const color = getComputedStyle(root).getPropertyValue('--primary-color');
console.log(color);  // #2c5aa0
```

---

## 📚 Resources

- **CSS Variables Guide:** https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **CSS Grid Guide:** https://css-tricks.com/snippets/css/complete-guide-grid/
- **Flexbox Guide:** https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- **Mobile-First:** https://www.nngroup.com/articles/mobile-first-design/
- **Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/

---

## Quick Reference

| Task | CSS |
|------|-----|
| Center text | `.text-center` |
| Space items horizontally | `.flex .flex-between` |
| Stack items vertically | `.flex .flex-col` |
| 2-column grid (responsive) | `.grid .grid-2` |
| Add padding | `.p-2` (16px) |
| Add margin bottom | `.mb-3` (24px) |
| Blue button | `.btn` |
| Full width button | `.btn .btn-full` |
| Red alert button | `.btn .btn-secondary` |
| Gray card | `.card` |

---

This guide covers the essential CSS architecture used in TravelHub. For the complete implementation, refer to `styles.css`.

**Last Updated:** February 15, 2026
