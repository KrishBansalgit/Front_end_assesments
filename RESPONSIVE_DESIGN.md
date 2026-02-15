# Responsive Design & Media Queries Reference

## 📱 Responsive Breakpoints Strategy

TravelHub uses a mobile-first approach with three main breakpoints. All media queries are **mobile-first**, meaning base CSS targets the smallest screens and media queries add enhancements for larger screens.

---

## Breakpoint Overview

```
MOBILE        TABLET        DESKTOP       LARGE DESKTOP
320px ────── 767px ────── 1023px ────── 1439px ────── ∞
                ↓              ↓              ↓
            @media min-width: 768px
                          @media min-width: 1024px
                                      @media min-width: 1440px
```

---

## 1. Mobile Breakpoint (320px - 767px)

### Base Styles (No Media Query Needed)

This is the **default CSS** that applies to all screen sizes. Mobile-first design means these styles work for the smallest devices.

#### Layout Changes
```css
/* Single Column Grid */
.grid-2 { grid-template-columns: 1fr; }
.grid-3 { grid-template-columns: 1fr; }
.grid-4 { grid-template-columns: 1fr; }

/* All content stacks vertically */
/* Flexbox items wrap and stack */
```

#### Typography
```css
/* Mobile font sizes */
--fs-h1: 2rem;      /* 32px */
--fs-h2: 1.5rem;    /* 24px */
--fs-h3: 1.25rem;   /* 20px */
--fs-h4: 1.1rem;    /* 17.6px */
--fs-body: 1rem;    /* 16px */
--fs-small: 0.875rem; /* 14px */
```

#### Navigation
```css
/* Mobile: Show hamburger menu, hide desktop nav */
.menu-toggle { display: flex; }  /* Visible */
nav { 
  position: absolute;
  max-height: 0;  /* Hidden by default */
  overflow: hidden;
}
nav.active { max-height: 400px; }  /* Expand when active */
```

#### Spacing
```css
/* Reduced padding on mobile */
.section { padding: var(--spacing-2xl) var(--spacing-md); }
/* 48px top/bottom, 16px left/right */

.header-container { padding: var(--spacing-md); }
/* 16px all sides */
```

#### Images
```css
/* Full width images on mobile */
.card-image { height: 200px; }
.slider-item { height: 300px; }
img { max-width: 100%; height: auto; }
```

#### Buttons & Forms
```css
/* Full width buttons on mobile */
.btn-full { width: 100%; }

/* Large touch targets */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: var(--spacing-sm) var(--spacing-lg);
}

/* Full width form inputs */
input, textarea, select { width: 100%; }
```

### Mobile-Specific Features

```html
<!-- Hamburger Menu (Mobile Only) -->
<button class="menu-toggle" aria-label="Toggle menu">
  <span></span>
  <span></span>
  <span></span>
</button>

<!-- Mobile Navigation (Hidden by default) -->
<nav>
  <ul>
    <!-- Navigation items -->
  </ul>
</nav>
```

---

## 2. Tablet Breakpoint (@media min-width: 768px)

### When This Applies
- iPad (768px width)
- iPad Mini (768px width)
- Large phones in landscape (768px+)
- Tablets with 7-10 inch screens

### Key Changes

#### Grid Layout
```css
@media (min-width: 768px) {
  /* 2-column layout on tablets */
  .grid-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}
```

**Visual Example:**
```
MOBILE (1 column):        TABLET (2 columns):
┌──────────────┐         ┌──────────┬──────────┐
│   Card 1     │         │ Card 1   │ Card 2   │
├──────────────┤         ├──────────┼──────────┤
│   Card 2     │         │ Card 3   │ Card 4   │
├──────────────┤         ├──────────┼──────────┤
│   Card 3     │         │ Card 5   │ Card 6   │
└──────────────┘         └──────────┴──────────┘
```

#### Navigation
```css
@media (min-width: 768px) {
  /* Hide hamburger, show horizontal nav */
  .menu-toggle { display: none; }
  
  nav {
    position: static;
    background-color: transparent;
    box-shadow: none;
    max-height: none;
    overflow: visible;
  }
  
  /* Horizontal navigation */
  nav ul {
    display: flex;
    gap: var(--spacing-lg);
    padding: 0;
  }
}
```

#### Typography
```css
@media (min-width: 768px) {
  /* Slightly larger text */
  --fs-h1: 2.5rem;    /* 40px */
  --fs-h2: 2rem;      /* 32px */
  --fs-h3: 1.5rem;    /* 24px */
}
```

#### Images
```css
@media (min-width: 768px) {
  /* Larger slider images */
  .slider-item { height: 400px; }
}
```

#### Footer
```css
@media (min-width: 768px) {
  /* 2-column footer layout */
  .footer-section {
    display: inline-block;
    width: 48%;
    margin-right: 2%;
  }
}
```

#### Spacing
```css
@media (min-width: 768px) {
  .section { padding: var(--spacing-3xl) var(--spacing-xl); }
  .header-container { padding: var(--spacing-lg); }
}
```

### Tablet-Specific Features

```html
<!-- Hero section can show side-by-side layout -->
<div class="grid grid-2">
  <div><!-- Text content --></div>
  <div><img src="..." alt="..."></div>
</div>
```

---

## 3. Desktop Breakpoint (@media min-width: 1024px)

### When This Applies
- Desktop computers (1024px+)
- Laptop screens
- Large tablets in landscape
- Typical laptop minimum width

### Key Changes

#### Grid Layout
```css
@media (min-width: 1024px) {
  /* 3-4 column layout on desktop */
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
}
```

**Visual Example:**
```
DESKTOP (3+ columns):
┌─────────────┬─────────────┬─────────────┐
│  Card 1     │  Card 2     │  Card 3     │
├─────────────┼─────────────┼─────────────┤
│  Card 4     │  Card 5     │  Card 6     │
├─────────────┼─────────────┼─────────────┤
│  Card 7     │  Card 8     │  Card 9     │
└─────────────┴─────────────┴─────────────┘
```

#### Hero Section
```css
@media (min-width: 1024px) {
  .hero {
    padding: var(--spacing-3xl);
    text-align: left;  /* Align left instead of center */
  }
}
```

#### Typography
```css
@media (min-width: 1024px) {
  /* Even larger heading sizes */
  --fs-h1: 3rem;      /* 48px */
  --fs-h2: 2.25rem;   /* 36px */
  --fs-h3: 1.75rem;   /* 28px */
}
```

#### Images
```css
@media (min-width: 1024px) {
  /* Hero / slider images can be even larger */
  .slider-item { height: 500px; }
  
  /* Side-by-side hero content */
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}
```

#### Footer
```css
@media (min-width: 1024px) {
  /* Full 4-column footer layout */
  footer .container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-2xl);
  }
}
```

#### Components
```css
@media (min-width: 1024px) {
  /* Wider content areas */
  .container { max-width: 1200px; }
  
  /* Larger padding for premium feel */
  .section { padding: var(--spacing-3xl); }
}
```

---

## 4. Large Desktop (@media min-width: 1440px)

### When This Applies
- Large monitors (1440px+)
- Wide ultrawide displays
- Large desktop screens

### Key Changes

```css
@media (min-width: 1440px) {
  /* Increase max-width for content */
  .container { max-width: 1400px; }
  
  /* Extra spacing on wide screens */
  .section { padding: var(--spacing-3xl) auto; }
}
```

---

## Complete Media Query Examples

### Example 1: Card Grid Responsive

```css
/* MOBILE: 1 column */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

/* TABLET: 2 columns */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* DESKTOP: 3 columns */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* LARGE DESKTOP: 4 columns */
@media (min-width: 1440px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Example 2: Responsive Typography

```css
/* MOBILE */
h1 { font-size: 2rem; }    /* 32px */

/* TABLET */
@media (min-width: 768px) {
  h1 { font-size: 2.5rem; }  /* 40px */
}

/* DESKTOP */
@media (min-width: 1024px) {
  h1 { font-size: 3rem; }    /* 48px */
}
```

### Example 3: Hero Section Layout

```html
<!-- HTML structure same across all screen sizes -->
<section class="hero">
  <div class="container">
    <div class="grid grid-2">
      <div><!-- Text content --></div>
      <div><img src="..." alt="..."></div>
    </div>
  </div>
</section>
```

```css
/* MOBILE: Stack vertically */
.grid { grid-template-columns: 1fr; }

/* TABLET: 2 columns but still stacked */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* DESKTOP: Side by side layout */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .hero { text-align: left; }
}
```

---

## Responsive Units Used

### Mobile-First Philosophy

```css
/* WORST PRACTICE (Desktop-first) */
@media (max-width: 767px) {
  /* Mobile styles */
}
/* WRONG! Hard to maintain */

/* BEST PRACTICE (Mobile-first) */
/* Mobile styles as base */
.element { font-size: 1rem; }

/* Enhancement for larger screens */
@media (min-width: 768px) {
  .element { font-size: 1.2rem; }
}
/* RIGHT! Easier to read and maintain */
```

### Relative vs. Absolute Units

```css
/* Use relative units (flexible) */
padding: var(--spacing-md);     /* 1rem = 16px, scales with user font size */
width: 80%;                     /* Flexible width */
font-size: 1.5rem;             /* Relative to base 16px */
max-width: 1200px;             /* Constraint but flexible below */

/* Use absolute units sparingly */
border: 1px solid #ecf0f1;      /* Borders should be 1px */
box-shadow: 0 2px 4px ...;      /* Shadows use pixels for precision */

/* Use viewport units carefully */
height: 50vh;                   /* 50% of viewport height */
width: 100vw;                   /* Full viewport width */
```

---

## Testing Media Queries

### Using Chrome DevTools

1. **Open DevTools** (F12)
2. **Click Device Toolbar** (Ctrl+Shift+M)
3. **Select device or custom width:**
   - iPhone SE: 375px
   - iPad: 768px
   - Desktop: 1024px or 1440px

4. **Test responsive behavior:**
   - Resize the browser window
   - Watch grid layout change
   - Verify navigation toggle
   - Check font size adjustments

### Manual Testing

```javascript
// Check current breakpoint in console
window.innerWidth
// Output: 768 (tablet), 1024 (desktop), etc.

// Or use this to see which breakpoint is active
const width = window.innerWidth;
const breakpoint = width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop';
console.log(`Current breakpoint: ${breakpoint}`);
```

---

## Responsive Images

```html
<!-- Mobile-first responsive images -->
<img 
  src="images/small.jpg"           <!-- Default mobile image -->
  srcset="
    images/medium.jpg 768px,       <!-- Tablet size at 768px -->
    images/large.jpg 1024px        <!-- Desktop size at 1024px -->
  "
  alt="Description"
  loading="lazy"                   <!-- Performance optimization -->
>
```

---

## Accessibility in Responsive Design

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --text-dark: #ecf0f1;
    --bg-white: #34495e;
  }
}

/* High contrast mode */
@media (prefers-contrast: more) {
  body {
    color-scheme: dark light;
  }
}
```

---

## Performance Tips

1. **Mobile-first CSS** - Smaller initial file size
2. **Minimize breakpoints** - Only 3-4 main breakpoints needed
3. **Use CSS variables** - Change sizes without duplicating code
4. **Lazy load images** - Load images as needed
5. **Compress assets** - Optimize images for mobile

---

## Common Issues & Solutions

### Issue: Content too narrow on desktop
```css
/* Solution: Adjust max-width */
.container { max-width: 1400px; }
```

### Issue: Hamburger menu overlaps content
```css
/* Solution: Adjust z-index */
header { z-index: 100; }
nav { z-index: 99; }
```

### Issue: Images distorted on some sizes
```css
/* Solution: Use object-fit */
img { object-fit: cover; }
```

### Issue: Text too small on mobile
```css
/* Solution: Increase base font-size */
body { font-size: 16px; }  /* Better than 12px */
```

---

## Breakpoint Summary Table

| Device | Width | Breakpoint | Grid Columns | Font Size |
|--------|-------|------------|-------------|-----------|
| **Mobile** | 320-767px | None | 1 col | 2rem (h1) |
| **Tablet** | 768-1023px | @media 768px | 2 cols | 2.5rem (h1) |
| **Desktop** | 1024-1439px | @media 1024px | 3 cols | 3rem (h1) |
| **Large** | 1440px+ | @media 1440px | 4 cols | 3rem (h1) |

---

## Implementation Checklist

- ✅ Mobile CSS is base (no media query)
- ✅ Tablet breakpoint at 768px
- ✅ Desktop breakpoint at 1024px
- ✅ Large breakpoint at 1440px
- ✅ Hamburger menu hides on tablet+
- ✅ Grid columns increase with screen size
- ✅ Font sizes scale with breakpoints
- ✅ Images responsive with max-width
- ✅ Containers have max-width constraint
- ✅ Spacing adjusts for larger screens

---

This responsive design system ensures TravelHub looks perfect on every device from small phones to large desktop monitors.

**Last Updated:** February 15, 2026
