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

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, setting up video modals...'); // Debug log
  
  // Get the video modal and iframe
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const videoThumbnail = document.getElementById('videoThumbnail');
  const thumbnailImg = document.getElementById('thumbnailImg');
  const playButton = document.querySelector('.play-button');
  
  // Grab all work cards
  const workCards = document.querySelectorAll('.work-card');
  console.log('Found work cards:', workCards.length); // Debug log

  // Function to open video modal
  function openVideoModal(videoId) {
    if (videoModal && videoIframe) {
      // Set the video source directly
      videoIframe.src = `https://www.youtube.com/embed/${videoId}?mute=1&autoplay=1&rel=0&showinfo=0&origin=${window.location.origin}&enablejsapi=1`;
      
      // Show the modal
      videoModal.style.setProperty('display', 'block', 'important');
      
      // Store current video ID for reference
      videoModal.setAttribute('data-current-video', videoId);
      
      console.log('Video modal opened with video ID:', videoId);
    }
  }

  // Function to close video modal
  function closeVideoModal() {
    if (videoModal && videoIframe) {
      // Clear the video source to stop playback
      videoIframe.src = '';
      
      // Hide the modal with important display property
      videoModal.style.setProperty('display', 'none', 'important');
      console.log('Video modal closed');
    }
  }

  // Make closeVideoModal globally available
  window.closeVideoModal = closeVideoModal;



  // Add event listeners for modal open on click of work cards
  workCards.forEach((card, index) => {
    console.log(`Setting up card ${index + 1}`); // Debug log
    
    // Function to open video for this card
    function openVideoForCard() {
      console.log(`Work card ${index + 1} clicked!`); // Debug log
      const videoId = card.getAttribute('data-video');
      if (videoId) {
        openVideoModal(videoId);
      } else {
        console.log('No video ID found in card'); // Debug log
      }
    }
    
    // Click handler for the entire card
    card.addEventListener('click', function(e) {
      openVideoForCard();
    });

    // Click handler for play icon specifically
    const playIcon = card.querySelector('.play-icon');
    if (playIcon) {
      playIcon.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click from also firing
        openVideoForCard();
      });
    }

    // Accessibility: open modal on keyboard Enter or Space
    card.addEventListener('keydown', function(e) {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openVideoForCard();
      }
    });
  });

  // Close modal on pressing the ESC key
  window.addEventListener('keydown', (e) => {
    if(e.key === "Escape") {
      closeVideoModal();
    }
  });

  // Close modal on clicking outside the video
  document.addEventListener('click', (e) => {
    if (videoModal && videoModal.style.display === 'block') {
      // Close if clicking on the modal background (not the iframe or close button)
      if (e.target === videoModal || (e.target.classList.contains('video-modal') && !e.target.classList.contains('video-close-btn'))) {
        closeVideoModal();
      }
    }
  });
});
