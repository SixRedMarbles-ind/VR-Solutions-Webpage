// Navbar mobile toggle
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu on nav link click (recommended for UX)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// SheetDB API endpoint
const SHEETDB_API = "https://sheetdb.io/api/v1/ltnoe7dwmxna4";

// Form handling
const form = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Basic front-end validation
  if (!form.checkValidity()) {
    statusDiv.textContent = "Please fill out all required fields correctly.";
    statusDiv.style.color = "#d80000"; // Bright Red for errors
    return;
  }

  statusDiv.textContent = "Sending...";
  statusDiv.style.color = "#001b2d"; // Navy Blue (info)

  // Prepare data to send to SheetDB
  const formData = {
    data: {
      Name: form.Name.value.trim(),
      Email: form.Email.value.trim(),
      Company: form.Company.value.trim(),
      Message: form.Message.value.trim()
    }
  };

  try {
    const response = await fetch(SHEETDB_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      form.reset();
      statusDiv.textContent = "Thank you! Your message has been sent.";
      statusDiv.style.color = "#009d5f"; // Green for success
    } else {
      throw new Error(`Server error: ${response.status}`);
    }
  } catch (error) {
    statusDiv.textContent = "Submission failed. Please try again later.";
    statusDiv.style.color = "#d80000";
    console.error('Form submission error:', error);
  }
});

/* OUR WORKS Modal logic */

// Grab all work cards and the modal overlay
const workCards = document.querySelectorAll('.work-card');
const overlay = document.getElementById('modal-overlay');

// Function to close all modals
function closeAllModals() {
  document.querySelectorAll('.work-card .video-modal').forEach(modal => {
    modal.style.display = 'none';
    const video = modal.querySelector('video');
    if (video) video.pause();
  });
  overlay.style.display = 'none';
}

// Add event listeners for modal open on click of work cards
workCards.forEach(card => {
  card.addEventListener('click', function(e) {
    // Prevent modal open if clicked inside modal video itself (optional enhancement)
    // Not needed here since modal is inside card hidden until open
    
    const videoModal = card.querySelector('.video-modal');
    if (videoModal) {
      videoModal.style.display = 'block';
      overlay.style.display = 'block';
      // Pause all other videos just in case
      document.querySelectorAll('.work-card .video-modal video').forEach(vid => vid.pause());
      // Play the clicked card's video
      const video = videoModal.querySelector('video');
      if(video) video.play();
    }
  });

  // Accessibility: open modal on keyboard Enter or Space
  card.addEventListener('keydown', function(e) {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      card.click();
    }
  });
});

// Close modal on clicking the overlay
overlay.addEventListener('click', closeAllModals);

// Close modal on pressing the ESC key
window.addEventListener('keydown', (e) => {
  if(e.key === "Escape") {
    closeAllModals();
  }
});
