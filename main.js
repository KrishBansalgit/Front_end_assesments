/* ===============================================
   TRAVEL GUIDE WEB APP - MAIN JAVASCRIPT
   =============================================== */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }

  // Close menu when a link is clicked
  if (nav) {
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // Initialize sliders if they exist
  initializeSliders();
  
  // Initialize form validation if forms exist
  initializeForms();
});

// =============== SLIDER FUNCTIONALITY ===============
function initializeSliders() {
  const sliders = document.querySelectorAll('.slider-container');
  
  sliders.forEach((slider, index) => {
    const wrapper = slider.querySelector('.slider-wrapper');
    const items = slider.querySelectorAll('.slider-item');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    
    let currentSlide = 0;
    const totalSlides = items.length;

    // Auto-advance slides every 5 seconds
    let autoSlideInterval = setInterval(nextSlide, 5000);

    // Previous slide
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
      });
    }

    // Next slide
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
      });
    }

    // Dot navigation
    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        goToSlide(dotIndex);
        autoSlideInterval = setInterval(nextSlide, 5000);
      });
    });

    function updateSlider() {
      const offset = -currentSlide * 100;
      wrapper.style.transform = `translateX(${offset}%)`;
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    }

    function goToSlide(n) {
      currentSlide = n;
      updateSlider();
    }

    // Initialize first slide
    updateSlider();
  });
}

// =============== FORM VALIDATION ===============
function initializeForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
    });

    form.addEventListener('submit', (e) => {
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
  const value = field.value.trim();
  const type = field.type;
  const name = field.name || field.id;
  let isValid = true;
  let errorMessage = '';

  // Check if field is empty
  if (!value) {
    isValid = false;
    errorMessage = 'This field is required';
  }
  // Email validation
  else if (type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }
  // Phone validation
  else if (type === 'tel') {
    const phoneRegex = /^[0-9\-\+\s\(\)]{10,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
  }
  // Date validation
  else if (type === 'date') {
    const selectedDate = new Date(value);
    const today = new Date();
    if (selectedDate < today) {
      isValid = false;
      errorMessage = 'Please select a future date';
    }
  }
  // Min length for textarea/password
  else if ((type === 'password' || field.tagName === 'TEXTAREA') && value.length < 8) {
    isValid = false;
    errorMessage = 'Minimum 8 characters required';
  }

  // Display error/success
  if (isValid) {
    field.classList.remove('error');
    const errorMsg = field.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
      errorMsg.classList.remove('active');
    }
  } else {
    field.classList.add('error');
    let errorMsg = field.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
      errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      field.parentNode.insertBefore(errorMsg, field.nextSibling);
    }
    errorMsg.textContent = errorMessage;
    errorMsg.classList.add('active');
  }

  return isValid;
}

function showSuccessMessage(form) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message active';
  successDiv.textContent = 'Thank you! We will get back to you soon.';
  form.insertBefore(successDiv, form.firstChild);
  
  setTimeout(() => {
    successDiv.classList.remove('active');
    setTimeout(() => successDiv.remove(), 300);
  }, 3000);
}

// =============== SMOOTH SCROLL ===============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// =============== ACTIVE NAV LINK ===============
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.color = 'var(--primary-color)';
      link.style.borderBottom = '2px solid var(--primary-color)';
    }
  });
}

setActiveNav();
