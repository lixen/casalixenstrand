const translations = {
  sv: {
    header_subtitle: "Riviera del Sol, Costa del Sol",
    welcome_title: "Välkommen till Casa Lixenstrand",
    welcome_text: "Ett mysigt semesterboende i Riviera del Sol, Costa del Sol.",
    about_title: "Om Huset",
    about_text: "Casa Lixenstrand erbjuder bekvämt boende med 3 sovrum, 2 badrum, fullt utrustat kök, Wi-Fi, AC och närhet till stranden.",
    gallery_title: "Galleri",
    pricing_title: "Priser",
    pricing_text: "Pris per månad: 15 000 kr (inkl. el och vatten).",
    availability_title: "Tillgänglighet",
    availability_text: "Se våra lediga datum och boka din vistelse.",
    contact_title: "Kontakt",
    contact_text: "Fyll i formuläret eller kontakta oss via WhatsApp.",
    send_button: "Skicka",
    whatsapp_button: "WhatsApp",
    email_button: "Maila oss",
    email_modal_title: "Skicka meddelande",
    view_calendar_button: "Visa tillgänglighet",
    calendar_info: "Klicka för att se detaljerad tillgänglighet och boka dina datum.",
    calendar_modal_title: "Tillgänglighet & Bokning"
  },
  en: {
    header_subtitle: "Riviera del Sol, Costa del Sol",
    welcome_title: "Welcome to Casa Lixenstrand",
    welcome_text: "A cozy vacation home in Riviera del Sol, Costa del Sol.",
    about_title: "About the House",
    about_text: "Casa Lixenstrand offers comfortable accommodation with 3 bedrooms, 2 bathrooms, a fully equipped kitchen, Wi-Fi, AC and walking distance to the beach.",
    gallery_title: "Gallery",
    pricing_title: "Prices",
    pricing_text: "Monthly price: 15,000 SEK (including electricity and water).",
    availability_title: "Availability",
    availability_text: "Check our available dates and book your stay.",
    contact_title: "Contact",
    contact_text: "Fill out the form or contact us on WhatsApp.",
    send_button: "Send",
    whatsapp_button: "WhatsApp",
    email_button: "Email us",
    email_modal_title: "Send message",
    view_calendar_button: "View availability",
    calendar_info: "Click to see detailed availability and book your dates.",
    calendar_modal_title: "Availability & Booking"
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    el.textContent = translations[lang][key];
  });

  // Update the flag in the dropdown button
  const currentFlag = document.getElementById("current-flag");
  if (currentFlag) {
    currentFlag.textContent = lang === "sv" ? "🇸🇪" : "🇬🇧";
  }

  // Close dropdown after selection
  const dropdownContent = document.getElementById("dropdown-content");
  if (dropdownContent) {
    dropdownContent.classList.remove("show");
  }

  localStorage.setItem("lang", lang);
}

function toggleDropdown() {
  const dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.classList.toggle("show");
}

// Close dropdown when clicking outside
window.addEventListener("click", function(event) {
  if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-btn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
});

// Email modal functions
function openEmailModal() {
  const modal = document.getElementById("emailModal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeEmailModal() {
  const modal = document.getElementById("emailModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Close modal when clicking outside of it
window.addEventListener("click", function(event) {
  const modal = document.getElementById("emailModal");
  if (event.target === modal) {
    closeEmailModal();
  }
});

// Calendar modal functions
function openCalendarModal() {
  const modal = document.getElementById("calendarModal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeCalendarModal() {
  const modal = document.getElementById("calendarModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal with Escape key
window.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeEmailModal();
    closeCalendarModal();
  }
});

// Close modals when clicking outside
window.addEventListener("click", function(event) {
  const emailModal = document.getElementById("emailModal");
  const calendarModal = document.getElementById("calendarModal");

  if (event.target === emailModal) {
    closeEmailModal();
  }
  if (event.target === calendarModal) {
    closeCalendarModal();
  }
});

// Static header - no animation needed

// Easing function for smoother animation
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
    ticking = true;
  }
}

// Handle wheel events during header shrinking
function handleWheel(e) {
  // Only handle wheel events when at the very top
  if (window.scrollY === 0) {
    // Update target virtual scroll for smooth interpolation
    const delta = e.deltaY || e.detail || (-e.wheelDelta);
    targetVirtualScroll += delta * 0.3;
    targetVirtualScroll = Math.max(0, targetVirtualScroll);

    // If scrolling up, allow header to expand again
    if (delta < 0) {
      targetVirtualScroll = Math.max(0, targetVirtualScroll + delta * 0.3);
    }

    requestTick();

    // Only prevent default if we're actually in header animation mode
    if (isHeaderShrinking) {
      e.preventDefault();
    }
  }
}

// Handle touch events for mobile
let touchStartY = 0;

function handleTouchStart(e) {
  touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e) {
  // Only handle touch events when at the very top
  if (window.scrollY === 0) {
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;

    targetVirtualScroll += deltaY * 1.5;
    targetVirtualScroll = Math.max(0, targetVirtualScroll);

    // If swiping down, allow header to expand again
    if (deltaY < 0) {
      targetVirtualScroll = Math.max(0, targetVirtualScroll + deltaY * 1.5);
    }

    touchStartY = touchY;
    requestTick();

    // Only prevent default if we're actually in header animation mode
    if (isHeaderShrinking) {
      e.preventDefault();
    }
  }
}

// Handle regular scroll events to reset header when at top
function handleRegularScroll() {
  if (window.scrollY === 0 && targetVirtualScroll > 0) {
    // User scrolled back to top, reset the virtual scroll gradually
    targetVirtualScroll = Math.max(0, targetVirtualScroll * 0.9);
    requestTick();
  }

  // Safety: Always ensure scrolling is enabled when not at the top
  if (window.scrollY > 0) {
    isHeaderShrinking = false;
    document.body.style.overflow = 'auto';
  }

  // Safety: If somehow scrolling gets blocked, force it back on
  if (document.body.style.overflow === 'hidden' && window.scrollY > 10) {
    document.body.style.overflow = 'auto';
    isHeaderShrinking = false;
  }
}

// Add event listeners
window.addEventListener('wheel', handleWheel, { passive: false });
window.addEventListener('touchstart', handleTouchStart, { passive: false });
window.addEventListener('touchmove', handleTouchMove, { passive: false });
window.addEventListener('scroll', () => {
  handleRegularScroll();
  requestTick();
});

// Gallery functionality
let currentImageIndex = 0;
let galleryImages = [];

function loadGallery() {
  const galleryContainer = document.getElementById('gallery-container');
  const totalImages = 27; // We know we have 27 images

  galleryImages = [];

  for (let i = 1; i <= totalImages; i++) {
    const imageNumber = i.toString().padStart(2, '0');
    const extension = i <= 24 ? 'jpg' : 'jpeg'; // First 24 are jpg, last 3 are jpeg
    const imagePath = `images/album/casa_${imageNumber}.${extension}`;
    const thumbnailPath = `images/album/thumbnails/thumb_casa_${imageNumber}.${extension}`;

    galleryImages.push({
      full: imagePath,
      thumb: thumbnailPath,
      alt: `Casa Lixenstrand - Bild ${i}`
    });

    // Create gallery item
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.onclick = () => openLightbox(i - 1);

    galleryItem.innerHTML = `
      <img src="${thumbnailPath}" alt="Casa Lixenstrand - Bild ${i}" loading="lazy"
           onerror="this.src='${imagePath}'">
      <div class="overlay">
        <div class="overlay-text">Bild ${i}</div>
      </div>
    `;

    galleryContainer.appendChild(galleryItem);
  }
}

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const counter = document.getElementById('lightbox-counter');

  lightboxImage.src = galleryImages[index].full;
  lightboxImage.alt = galleryImages[index].alt;
  counter.textContent = `${index + 1} / ${galleryImages.length}`;

  lightbox.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
  currentImageIndex += direction;

  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  }

  const lightboxImage = document.getElementById('lightbox-image');
  const counter = document.getElementById('lightbox-counter');

  lightboxImage.src = galleryImages[currentImageIndex].full;
  lightboxImage.alt = galleryImages[currentImageIndex].alt;
  counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display === 'block') {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      changeLightboxImage(-1);
    } else if (e.key === 'ArrowRight') {
      changeLightboxImage(1);
    }
  }
});

// Close lightbox when clicking on lightbox background
function setupLightboxCloseHandler() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      // Close if clicking on the lightbox background (not the image or buttons)
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const defaultLang = localStorage.getItem("lang") || "sv";
  setLanguage(defaultLang);

  // Load gallery
  loadGallery();

  // Setup lightbox close handler
  setupLightboxCloseHandler();

  // Initialize scroll effect and ensure proper spacing
  const main = document.querySelector('main');
  const isMobile = window.innerWidth <= 768;

  // Set initial margin with larger negative gap so welcome text is visible
  const initialHeight = isMobile ? 50 : 60;
  const constantGap = -3;
  main.style.marginTop = `${initialHeight + constantGap}vh`;

  // Start with normal scrolling enabled
  document.body.style.overflow = 'auto';
  isHeaderShrinking = false;

  handleScroll();
});
