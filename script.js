// Language functionality
const translations = {
  sv: {
    header_subtitle: "Riviera del Sol, Costa del Sol",
    welcome_title: "Välkommen till Casa Lixenstrand",
    welcome_text: "Upptäck vårt vackra semesterboende beläget i Riviera del Sol på Costa del Sol. Med gångavstånd till många bra restauranger i både Riviera och Calahonda, samt nära Riviera 11 Sport Club, Max Beach Club och Miraflores Golf, erbjuder Casa Lixenstrand den perfekta platsen för en oförglömlig semester.",
    about_title: "Om Huset",
    about_text: "Casa Lixenstrand erbjuder bekvämt boende<br><br>• 200 m² radhus<br>• 3 sovrum med egna badrum (6 sovplatser)<br>• Fullt utrustat kök med stor kyl/frys<br>• 3 balkonger, uteplats och garageuppfart<br>• Tvättstuga och toalett i källaren<br>• Biorum med projektor<br>• 2 höj- och sänkbara skrivbord + 32\" 4K-skärmar (perfekt för distansjobb!)<br>• Gigabit-internet<br>• 7 kW solpaneler och 5 kWh batteri<br><br>Huset är smakfullt inrett och har alla moderna bekvämligheter du behöver för en avkopplande semester.",
    pricing_title: "Priser",
    pricing_text: "Våra priser varierar beroende på säsong och vistelsens längd. Kontakta oss för aktuella priser och tillgänglighet. Vi erbjuder konkurrenskraftiga priser för detta fantastiska läge.",
    gallery_title: "Galleri",
    availability_title: "Tillgänglighet",
    availability_text: "Casa Lixenstrand är tillgängligt för uthyrning året runt. Vi rekommenderar att du bokar i god tid. Kontakta oss för att kontrollera tillgänglighet för dina önskade datum.",
    contact_title: "Kontakt",
    contact_text: "För bokningar och frågor, kontakta oss via e-post eller telefon. Vi hjälper gärna till med all information du behöver för din vistelse på Costa del Sol.",
    whatsapp_button: "WhatsApp",
    email_button: "E-post",
    email_modal_title: "Skicka meddelande",
    send_button: "Skicka",
    view_calendar_button: "Visa tillgänglighet",
    calendar_info: "Klicka för att se detaljerad tillgänglighet och boka dina datum.",
    calendar_modal_title: "Tillgänglighet & Bokning"
  },
  en: {
    header_subtitle: "Riviera del Sol, Costa del Sol",
    welcome_title: "Welcome to Casa Lixenstrand",
    welcome_text: "Discover our beautiful vacation rental located in the picturesque Riviera del Sol on Costa del Sol. Within walking distance to many excellent restaurants in both Riviera and Calahonda, and close to Riviera 11 Sport Club, Max Beach Club and Miraflores Golf, Casa Lixenstrand offers the perfect location for an unforgettable vacation.",
    about_title: "About the House",
    about_text: "Casa Lixenstrand offers comfortable accommodation for up to 6 people.<br><br>• 200 m² townhouse<br>• 3 bedrooms with private bathrooms (6 sleeping places)<br>• Fully equipped kitchen with large fridge/freezer<br>• 3 balconies, patio and garage driveway<br>• Laundry room and toilet in basement<br>• Cinema room with projector<br>• 2 height-adjustable desks + 32\" 4K screens (perfect for remote work!)<br>• Gigabit internet<br>• 7 kW solar panels and 5 kWh battery<br><br>The house is tastefully decorated and has all modern amenities you need for a relaxing vacation.",
    pricing_title: "Pricing",
    pricing_text: "Our prices vary depending on season and length of stay. Contact us for current prices and availability. We offer competitive rates for this fantastic location.",
    gallery_title: "Gallery",
    availability_title: "Availability",
    availability_text: "Casa Lixenstrand is available for rent year-round. We recommend booking well in advance. Contact us to check availability for your desired dates.",
    contact_title: "Contact",
    contact_text: "For bookings and inquiries, contact us via email or phone. We're happy to help with any information you need for your stay on Costa del Sol.",
    whatsapp_button: "WhatsApp",
    email_button: "Email",
    email_modal_title: "Send message",
    send_button: "Send",
    view_calendar_button: "View availability",
    calendar_info: "Click to see detailed availability and book your dates.",
    calendar_modal_title: "Availability & Booking"
  }
};

const DEFAULT_LANG = "sv";

function isSupportedLanguage(lang) {
  return Object.prototype.hasOwnProperty.call(translations, lang);
}

function getLanguageFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  return isSupportedLanguage(lang) ? lang : null;
}

function updateLanguageUrl(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);
}

function setLanguage(lang) {
  if (!isSupportedLanguage(lang)) {
    lang = DEFAULT_LANG;
  }

  const elements = document.querySelectorAll('[data-key]');
  elements.forEach(element => {
    const key = element.getAttribute('data-key');
    if (translations[lang] && translations[lang][key]) {
      // Use innerHTML for about_text to support <br> tags, textContent for others
      if (key === 'about_text') {
        element.innerHTML = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });

  // Update language selector text
  const currentLang = document.getElementById('current-lang');
  if (currentLang) {
    currentLang.textContent = lang === 'sv' ? 'SWE' : 'ENG';
  }

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Keep the active language shareable in the URL.
  updateLanguageUrl(lang);

  // Update form placeholders
  const nameInput = document.querySelector('input[name="name"]');
  const emailInput = document.querySelector('input[name="email"]');
  const messageTextarea = document.querySelector('textarea[name="message"]');

  if (nameInput) nameInput.placeholder = lang === 'sv' ? 'Namn' : 'Name';
  if (emailInput) emailInput.placeholder = lang === 'sv' ? 'E-post' : 'Email';
  if (messageTextarea) messageTextarea.placeholder = lang === 'sv' ? 'Meddelande' : 'Message';

  // Save language preference
  localStorage.setItem('lang', lang);

  // Close dropdown after selection
  closeDropdown();
}

// Toggle language dropdown
function toggleDropdown() {
  const dropdown = document.getElementById('dropdown-content');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

// Close language dropdown
function closeDropdown() {
  const dropdown = document.getElementById('dropdown-content');
  if (dropdown) {
    dropdown.classList.remove('show');
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const dropdown = document.querySelector('.language-dropdown');
  if (dropdown && !dropdown.contains(event.target)) {
    closeDropdown();
  }
});

// Email modal functions
function openEmailModal() {
  const modal = document.getElementById('emailModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeEmailModal() {
  const modal = document.getElementById('emailModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Calendar modal functions
function openCalendarModal() {
  const modal = document.getElementById('calendarModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeCalendarModal() {
  const modal = document.getElementById('calendarModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
  const emailModal = document.getElementById('emailModal');
  const calendarModal = document.getElementById('calendarModal');

  if (event.target === emailModal) {
    closeEmailModal();
  }
  if (event.target === calendarModal) {
    closeCalendarModal();
  }
});

// Gallery functionality
let currentImageIndex = 0;
let galleryImages = [];

function loadGallery() {
  const galleryContainer = document.getElementById('gallery-container');
  const totalImages = 26; // We have 26 images (casa_01.jpg to casa_26.jpg)

  galleryImages = [];

  for (let i = 1; i <= totalImages; i++) {
    const imageNumber = i.toString().padStart(2, '0');
    const imagePath = `images/album/casa_${imageNumber}.jpg`;
    const thumbnailPath = `images/album/thumbnails/thumb_casa_${imageNumber}.jpg`;

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
      <img src="${thumbnailPath}" alt="Casa Lixenstrand - ${i}" loading="lazy">
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

// Touch swipe support for lightbox
let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 50;

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    if (diff > 0) {
      changeLightboxImage(1); // Swipe left → next
    } else {
      changeLightboxImage(-1); // Swipe right → prev
    }
  }
}

function setupLightboxSwipe() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('touchstart', handleTouchStart, { passive: true });
    lightbox.addEventListener('touchend', handleTouchEnd, { passive: true });
  }
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox && lightbox.style.display === 'block') {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      changeLightboxImage(-1);
    } else if (e.key === 'ArrowRight') {
      changeLightboxImage(1);
    }
  }
});

// Initialize everything when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang");
  const defaultLang = getLanguageFromUrl() || (isSupportedLanguage(savedLang) ? savedLang : DEFAULT_LANG);
  setLanguage(defaultLang);

  // Load gallery
  loadGallery();

  // Setup lightbox close handler and swipe support
  setupLightboxCloseHandler();
  setupLightboxSwipe();

  // Ensure normal scrolling is always enabled
  document.body.style.overflow = 'auto';

  // Set dynamic copyright year
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
