// Language functionality
const translations = {
  sv: {
    header_subtitle: "Riviera del Sol, Costa del Sol",
    welcome_title: "Välkommen till Casa Lixenstrand",
    welcome_text: "Upptäck vårt vackra semesterboende beläget i det pittoreska Riviera del Sol på Costa del Sol. Med fantastisk utsikt över Medelhavet och närhet till både strand och golf, erbjuder Casa Lixenstrand den perfekta platsen för en oförglömlig semester.",
    about_title: "Om Huset",
    about_text: "Casa Lixenstrand erbjuder bekvämt boende för upp till 6 personer med 3 sovrum, 2 badrum, fullt utrustat kök och en rymlig terrass med havsutsikt. Huset är smakfullt inrett och har alla moderna bekvämligheter du behöver för en avkopplande semester.",
    pricing_title: "Priser",
    pricing_text: "Våra priser varierar beroende på säsong och vistelsens längd. Kontakta oss för aktuella priser och tillgänglighet. Vi erbjuder konkurrenskraftiga priser för detta fantastiska läge.",
    gallery_title: "Galleri",
    availability_title: "Tillgänglighet",
    availability_text: "Casa Lixenstrand är tillgängligt för uthyrning året runt. Vi rekommenderar att du bokar i god tid, särskilt under högsäsong (juni-augusti). Kontakta oss för att kontrollera tillgänglighet för dina önskade datum.",
    contact_title: "Kontakt",
    contact_text: "För bokningar och frågor, kontakta oss via e-post eller telefon. Vi hjälper gärna till med all information du behöver för din vistelse på Costa del Sol."
  },
  en: {
    header_subtitle: "Riviera del Sol, Costa del Sol",
    welcome_title: "Welcome to Casa Lixenstrand",
    welcome_text: "Discover our beautiful vacation rental located in the picturesque Riviera del Sol on Costa del Sol. With stunning Mediterranean views and proximity to both beach and golf, Casa Lixenstrand offers the perfect location for an unforgettable vacation.",
    about_title: "About the House",
    about_text: "Casa Lixenstrand offers comfortable accommodation for up to 6 people with 3 bedrooms, 2 bathrooms, fully equipped kitchen and a spacious terrace with sea views. The house is tastefully decorated and has all modern amenities you need for a relaxing vacation.",
    pricing_title: "Pricing",
    pricing_text: "Our prices vary depending on season and length of stay. Contact us for current prices and availability. We offer competitive rates for this fantastic location.",
    gallery_title: "Gallery",
    availability_title: "Availability",
    availability_text: "Casa Lixenstrand is available for rent year-round. We recommend booking well in advance, especially during high season (June-August). Contact us to check availability for your desired dates.",
    contact_title: "Contact",
    contact_text: "For bookings and inquiries, contact us via email or phone. We're happy to help with any information you need for your stay on Costa del Sol."
  }
};

function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-key]');
  elements.forEach(element => {
    const key = element.getAttribute('data-key');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update language selector flag
  const currentFlag = document.getElementById('current-flag');
  if (currentFlag) {
    currentFlag.innerHTML = lang === 'sv' ? '&#x1F1F8;&#x1F1EA;' : '&#x1F1EC;&#x1F1E7;';
  }

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
  const defaultLang = localStorage.getItem("lang") || "sv";
  setLanguage(defaultLang);

  // Load gallery
  loadGallery();

  // Setup lightbox close handler
  setupLightboxCloseHandler();

  // Ensure normal scrolling is always enabled
  document.body.style.overflow = 'auto';
});
