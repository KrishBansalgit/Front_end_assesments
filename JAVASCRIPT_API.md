# JavaScript API Reference - TravelHub Interactive Features

## 📖 Overview

The `js/main.js` file (280+ lines) powers all interactive features in TravelHub. This guide explains each function and how to use/extend them.

---

## 🔄 Initialization Flow

When a page loads, `main.js` runs the following sequence:

```javascript
// 1. Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // 2. Initialize mobile menu
  initializeMenu();
  
  // 3. Initialize image sliders
  initializeSliders();
  
  // 4. Initialize form validation
  initializeForms();
  
  // 5. Initialize smooth scrolling
  setSmoothScroll();
  
  // 6. Set active navigation link
  setActiveNav();
  
  // 7. Run page-specific features
  // (filters, calculators, etc.)
});
```

---

## 📱 Mobile Menu Functions

### `initializeMenu()`

**Purpose:** Set up hamburger menu toggle functionality

**Code:**
```javascript
function initializeMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  // Toggle menu when hamburger clicked
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
  });
  
  // Close menu when nav link clicked
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
    });
  });
}
```

**What it does:**
1. Finds the hamburger button (`.menu-toggle`)
2. Finds the navigation menu (`nav`)
3. Toggles `.active` class when hamburger is clicked
4. Auto-closes menu when user clicks a link

**CSS Connection:**
```css
nav { max-height: 0; overflow: hidden; }
nav.active { max-height: 400px; }
```

**How to customize:**
```javascript
// Change menu max-height in CSS:
@media (max-width: 767px) {
  nav { max-height: 0; }
  nav.active { max-height: 600px; }  /* Adjust for more links */
}
```

---

## 🖼️ Image Slider Functions

### `initializeSliders()`

**Purpose:** Create auto-advancing image carousels

**Code:**
```javascript
function initializeSliders() {
  const sliders = document.querySelectorAll('.slider-container');
  
  sliders.forEach(slider => {
    let currentSlide = 0;
    const slides = slider.querySelectorAll('.slider-item');
    const dots = slider.querySelectorAll('.slider-dot');
    
    // Auto-advance slider every 5 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider(slider, currentSlide);
    }, 5000);
    
    // Previous button
    slider.querySelector('.prev')?.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider(slider, currentSlide);
    });
    
    // Next button
    slider.querySelector('.next')?.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider(slider, currentSlide);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider(slider, currentSlide);
      });
    });
  });
}

function updateSlider(slider, index) {
  const slides = slider.querySelectorAll('.slider-item');
  const dots = slider.querySelectorAll('.slider-dot');
  
  // Hide all slides
  slides.forEach(slide => slide.style.display = 'none');
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Show current slide
  slides[index].style.display = 'block';
  dots[index].classList.add('active');
  
  // Animate with transform
  const wrapper = slider.querySelector('.slider-wrapper');
  wrapper.style.transform = `translateX(-${index * 100}%)`;
}
```

**What it does:**
1. Finds all `.slider-container` elements
2. Sets up auto-advance every 5000ms (5 seconds)
3. Adds click listeners to prev/next buttons
4. Adds click listeners to dot navigation
5. Updates slider display using `translateX` transform

**HTML Structure Required:**
```html
<div class="slider-container">
  <div class="slider-wrapper">
    <div class="slider-item">Slide 1</div>
    <div class="slider-item">Slide 2</div>
    <div class="slider-item">Slide 3</div>
  </div>
  
  <button class="prev">❮</button>
  <button class="next">❯</button>
  
  <div class="slider-dots">
    <span class="slider-dot active"></span>
    <span class="slider-dot"></span>
    <span class="slider-dot"></span>
  </div>
</div>
```

**How to customize:**

Change auto-advance speed:
```javascript
setInterval(() => {
  // ...
}, 3000);  // 3 seconds instead of 5
```

Disable auto-advance:
```javascript
// Remove or comment out:
// setInterval(() => { ... }, 5000);
```

---

## ✅ Form Validation Functions

### `initializeForms()`

**Purpose:** Set up form validation for all forms

**Code:**
```javascript
function initializeForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Validate on blur (when user leaves field)
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
    });
    
    // Validate on submit
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        showSuccessMessage(form);
        form.reset();
      }
    });
  });
}

function validateField(field) {
  const formGroup = field.closest('.form-group');
  
  // Clear previous error
  const existingError = formGroup.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  let isValid = true;
  let errorMessage = '';
  
  // Check if required
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    errorMessage = 'This field is required';
  }
  
  // Email validation
  else if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email';
    }
  }
  
  // Phone validation
  else if (field.type === 'tel' && field.value) {
    const phoneRegex = /^[0-9\-\+\s\(\)]{10,}$/i;
    if (!phoneRegex.test(field.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
  }
  
  // Date validation (no past dates)
  else if (field.type === 'date' && field.value) {
    const selectedDate = new Date(field.value);
    const today = new Date();
    if (selectedDate < today) {
      isValid = false;
      errorMessage = 'Please select a future date';
    }
  }
  
  // Minimum length
  else if (field.hasAttribute('minlength')) {
    const minLength = field.getAttribute('minlength');
    if (field.value.length < minLength) {
      isValid = false;
      errorMessage = `Minimum ${minLength} characters required`;
    }
  }
  
  // Show error if invalid
  if (!isValid) {
    formGroup.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = errorMessage;
    formGroup.appendChild(errorDiv);
  } else {
    formGroup.classList.remove('error');
  }
  
  return isValid;
}

function showSuccessMessage(form) {
  const message = document.createElement('div');
  message.className = 'success-message';
  message.textContent = 'Thank you! We will get back to you soon.';
  form.parentElement.insertBefore(message, form);
  
  // Auto-remove after 3 seconds
  setTimeout(() => message.remove(), 3000);
}
```

**What it does:**
1. Finds all forms on the page
2. Validates inputs on blur (when user leaves field)
3. Validates on form submit
4. Shows error messages below invalid fields
5. Shows success message on valid submit
6. Auto-closes menu when form submitted

**Validation Rules:**
- **Required fields:** Must not be empty
- **Email:** Must match email pattern (name@domain.com)
- **Phone:** Must have at least 10 digits
- **Date:** Cannot be in the past
- **Min length:** Checked via `minlength` attribute

**HTML Form Example:**
```html
<form>
  <div class="form-group">
    <label for="email">Email</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required
    >
  </div>
  
  <div class="form-group">
    <label for="phone">Phone</label>
    <input 
      type="tel" 
      id="phone" 
      name="phone" 
      minlength="10"
    >
  </div>
  
  <button type="submit" class="btn">Submit</button>
</form>
```

**How to customize:**

Add custom validation:
```javascript
// In validateField() function, add:
else if (field.name === 'username') {
  if (field.value.length < 3) {
    isValid = false;
    errorMessage = 'Username must be at least 3 characters';
  }
}
```

Change error styling:
```css
.form-group.error input,
.form-group.error textarea {
  border-color: #e74c3c;
  background-color: #fadbd8;
}
```

---

## 🎯 Filter Functions

### `filterDestinations(category)`

**Purpose:** Filter destination cards by category

**Code:**
```javascript
function filterDestinations(category) {
  const cards = document.querySelectorAll('.destination-card');
  
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  // Update button styling
  updateFilterButtons(category);
}

function updateFilterButtons(activeCategory) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.dataset.category === activeCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}
```

**What it does:**
1. Hides/shows destination cards based on category
2. Updates filter button styling

**HTML Structure Required:**
```html
<!-- Filter buttons -->
<div class="filter-buttons">
  <button class="filter-btn active" data-category="all" onclick="filterDestinations('all')">
    All
  </button>
  <button class="filter-btn" data-category="beach" onclick="filterDestinations('beach')">
    Beach
  </button>
</div>

<!-- Destination cards with data-category -->
<div class="destination-card" data-category="beach">
  <!-- Card content -->
</div>
```

### `filterGallery(category)`

**Purpose:** Filter gallery photos by category

**Code:**
```javascript
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
```

**Usage:** Same as `filterDestinations()` but for gallery items.

---

## 💰 Booking Calculator

### `updateSummary()`

**Purpose:** Update booking price in real-time

**Code:**
```javascript
function updateSummary() {
  // Get selected values
  const packageSelect = document.getElementById('package');
  const adultsInput = document.getElementById('adults');
  const destinationSelect = document.getElementById('destination');
  
  // Package pricing
  const packagePrices = {
    'european-tour': 2899,
    'southeast-asia': 1299,
    'caribbean-retreat': 1699,
    'himalayan-trek': 1999,
    'japan-luxury': 3499,
    'usa-roadtrip': 1599
  };
  
  // Calculate total
  const basePrice = packagePrices[packageSelect.value] || 999;
  const adults = parseInt(adultsInput.value) || 1;
  const insurance = 99;
  const totalPrice = (basePrice * adults) + insurance;
  
  // Update summary display
  document.getElementById('pricePackage').textContent = '$' + basePrice;
  document.getElementById('priceTraveler').textContent = adults;
  document.getElementById('totalPrice').textContent = '$' + totalPrice;
  
  // Update selected destination
  const selectedDest = destinationSelect.options[destinationSelect.selectedIndex].text;
  document.getElementById('summaryDest').textContent = selectedDest;
}
```

**What it does:**
1. Gets selected package, number of adults, destination
2. Looks up package price from `packagePrices` object
3. Calculates: `(basePrice × adults) + insurance`
4. Updates display with breakdown

**HTML Form Integration:**
```html
<div class="booking-form">
  <select id="destination" onchange="updateSummary()" required>
    <option value="">Select Destination</option>
    <option value="bali">Bali</option>
  </select>
  
  <select id="package" onchange="updateSummary()" required>
    <option value="">Select Package</option>
    <option value="european-tour">European Grand Tour - $2,899</option>
  </select>
  
  <input 
    type="number" 
    id="adults" 
    min="1" 
    value="1"
    onchange="updateSummary()"
  >
</div>

<div class="booking-summary">
  <div>Destination: <span id="summaryDest">-</span></div>
  <div>Package Price: <span id="pricePackage">$0</span></div>
  <div>Travelers: <span id="priceTraveler">1</span></div>
  <div><strong>Total: <span id="totalPrice">$0</span></strong></div>
</div>
```

**How to customize:**

Add more packages:
```javascript
const packagePrices = {
  'european-tour': 2899,
  'southeast-asia': 1299,
  'my-new-package': 1500,  // Add here
};
```

Add discount calculation:
```javascript
const discount = basePrice * 0.1;  // 10% off
const totalPrice = ((basePrice * adults) + insurance) - discount;
```

---

## 🔍 FAQ Search Function

### `searchFAQ()`

**Purpose:** Filter FAQ items based on search input

**Code:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('faqSearch');
  
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      searchFAQ();
    });
  }
});

function searchFAQ() {
  const searchTerm = document.getElementById('faqSearch').value.toLowerCase();
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question').textContent.toLowerCase();
    const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
    
    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
```

**What it does:**
1. Listens for typing in search input
2. Gets all FAQ items
3. Shows only items matching search term
4. Searches both question AND answer text

**HTML Structure:**
```html
<input 
  type="text" 
  id="faqSearch" 
  placeholder="Search FAQs..."
>

<div class="faq-item">
  <div class="faq-question">How do I book a trip?</div>
  <div class="faq-answer">You can book through our website...</div>
</div>
```

---

## ⚓ Smooth Scroll Function

### `setSmoothScroll()`

**Purpose:** Smooth scroll to page sections when clicking anchor links

**Code:**
```javascript
function setSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
```

**What it does:**
1. Finds all links starting with `#` (anchor links)
2. Prevents default link behavior
3. Scrolls smoothly to target section

**HTML Usage:**
```html
<!-- Link -->
<a href="#destinations">Go to Destinations</a>

<!-- Target section with matching ID -->
<section id="destinations">
  <!-- Content -->
</section>
```

---

## 🔗 Active Navigation Link

### `setActiveNav()`

**Purpose:** Highlight current page in navigation menu

**Code:**
```javascript
function setActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    // Remove active class from all links
    link.classList.remove('active');
    
    // Add active class to matching link
    if (link.href.includes(currentPath.split('/').pop())) {
      link.classList.add('active');
    }
  });
}
```

**What it does:**
1. Gets current page URL
2. Compares with each navigation link
3. Adds `.active` class to matching link

**CSS Styling:**
```css
nav a.active {
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
}
```

---

## 🎯 FAQ Accordion Function

### `initializeAccordion()`

**Purpose:** Toggle FAQ answers open/close

**Code:**
```javascript
function initializeAccordion() {
  const questions = document.querySelectorAll('.faq-question');
  
  questions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const isOpen = answer.style.display === 'block';
      
      // Close all other FAQs
      document.querySelectorAll('.faq-answer').forEach(a => {
        a.style.display = 'none';
      });
      
      // Toggle current FAQ
      answer.style.display = isOpen ? 'none' : 'block';
      
      // Update icon
      updateAccordionIcons();
    });
  });
}

function updateAccordionIcons() {
  const questions = document.querySelectorAll('.faq-question');
  
  questions.forEach(question => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('.faq-icon');
    
    if (answer.style.display === 'block') {
      icon.textContent = '−';  // Minus when open
    } else {
      icon.textContent = '+';  // Plus when closed
    }
  });
}
```

**HTML Structure:**
```html
<div class="faq-item">
  <button class="faq-question">
    How do I book?
    <span class="faq-icon">+</span>
  </button>
  <div class="faq-answer" style="display: none;">
    Answer content here...
  </div>
</div>
```

---

## 🔧 Extending the Code

### Adding a New Interactive Feature

1. **Create the function:**
```javascript
function myNewFeature() {
  // Your code here
}
```

2. **Call it in DOMContentLoaded:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  // ... existing code ...
  myNewFeature();  // Add here
});
```

3. **Test it:**
   - Add some console.log() statements
   - Open DevTools (F12) and check Console tab

### Debugging Tips

```javascript
// Log to console
console.log('Value:', myVariable);

// Log element
console.log('Element:', document.querySelector('.my-class'));

// Check if element exists
if (document.querySelector('.my-class')) {
  console.log('Element found!');
}

// Log all event listeners
console.log(getEventListeners(document.querySelector('.btn')));

// Time a function
console.time('myFunction');
myFunction();
console.timeEnd('myFunction');
```

---

## 📋 Event Listener Summary

| Element | Event | Function | Purpose |
|---------|-------|----------|---------|
| `.menu-toggle` | click | toggles nav `.active` | Show/hide mobile menu |
| `nav a` | click | removes nav `.active` | Close menu on link click |
| `.slider-*` | click | updateSlider() | Navigate slides |
| `.filter-btn` | click | filterDestinations() | Filter cards |
| `form input` | blur | validateField() | Real-time validation |
| `form` | submit | validateField() + form validation | Validate on submit |
| `#faqSearch` | keyup | searchFAQ() | Filter FAQ items |
| `.faq-question` | click | toggle `.faq-answer` | Open/close answers |
| `a[href^="#"]` | click | scrollIntoView() | Smooth scroll to section |

---

## ✨ Best Practices

**Do's:**
- Use `const` for variables that don't change
- Use `querySelector` for single elements
- Use `querySelectorAll` for multiple elements
- Add comments explaining complex logic
- Use semantic element selectors
- Test in Developer Tools before deploying

**Don'ts:**
- Don't use global variables (unless necessary)
- Don't manipulate DOM in loops (performance issue)
- Don't forget to prevent default on form submit
- Don't forget error handling
- Don't hardcode values (use data attributes)

---

## 🐛 Common Issues & Solutions

### "Cannot read property of null"
**Cause:** Element not found in DOM
**Solution:** Check element exists before accessing it
```javascript
const element = document.querySelector('.my-class');
if (element) {
  // Now safe to use element
}
```

### Form validation not working
**Cause:** Wrong form structure or missing IDs
**Solution:** Ensure form has proper structure:
```html
<form>
  <div class="form-group">
    <input name="email" type="email" required>
  </div>
</form>
```

### Event listeners not firing
**Cause:** JavaScript runs before HTML loads
**Solution:** Always use DOMContentLoaded:
```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Your code here
});
```

---

**This guide covers all JavaScript functions in TravelHub. For additional help, refer to the code comments in `js/main.js`.**

Last Updated: February 15, 2026
