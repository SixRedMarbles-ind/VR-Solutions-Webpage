// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      
      // Add specific animation classes based on data attributes
      const animationType = entry.target.dataset.animation;
      if (animationType) {
        entry.target.classList.add(animationType);
      }
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  // Add animation classes to elements
  const animateElements = document.querySelectorAll('.section-title, .metric-card, .work-card, .blog-card, .about-text, .hero-text');
  
  animateElements.forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    
    // Add staggered delay for cards
    if (el.classList.contains('metric-card') || el.classList.contains('work-card') || el.classList.contains('blog-card')) {
      el.style.animationDelay = `${index * 0.1}s`;
    }
    
    observer.observe(el);
  });
});

// Enhanced form interactions
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add loading state with premium styling
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #666, #888)';
    submitBtn.style.transform = 'scale(0.98)';
    
    // Collect form data
    const formData = new FormData(contactForm);
    const data = {
      Name: formData.get('Name'),
      Email: formData.get('Email'),
      Company: formData.get('Company'),
      Message: formData.get('Message')
    };
    
    // Send to SheetDB
    fetch('https://sheetdb.io/api/v1/ltnoe7dwmxna4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        // Success animation
        contactForm.classList.add('form-success');
        
        // Show success message with premium styling
        formStatus.textContent = '✓ Thank you! Your message has been sent successfully.';
        formStatus.style.color = '#28a745';
        formStatus.style.fontWeight = '600';
        
        // Reset form
        contactForm.reset();
        
        // Reset button with premium styling
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = 'linear-gradient(135deg, #E60000, #cc0000)';
        submitBtn.style.transform = 'scale(1)';
        
        // Remove success class after animation
        setTimeout(() => {
          contactForm.classList.remove('form-success');
        }, 600);
        
        // Clear status message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.style.fontWeight = 'normal';
        }, 5000);
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      
      // Show error message
      formStatus.textContent = '✗ Sorry, there was an error sending your message. Please try again.';
      formStatus.style.color = '#dc3545';
      formStatus.style.fontWeight = '600';
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = 'linear-gradient(135deg, #E60000, #cc0000)';
      submitBtn.style.transform = 'scale(1)';
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.style.fontWeight = 'normal';
      }, 5000);
    });
  });
  
  // Real-time form validation with micro-interactions
  const formInputs = contactForm.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.classList.add('form-error');
        setTimeout(() => {
          input.classList.remove('form-error');
        }, 400);
      }
    });
    
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.style.borderColor = '#28a745';
      } else {
        input.style.borderColor = '#e4e5e6';
      }
    });
  });
}

// Enhanced video modal interactions
function openVideoModal(videoId) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  modal.style.display = 'block';
  
  // Add entrance animation
  modal.style.animation = 'modalFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoIframe');
  
  // Add exit animation
  modal.style.animation = 'modalFadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse';
  
  setTimeout(() => {
    modal.style.display = 'none';
    iframe.src = '';
    document.body.style.overflow = 'auto';
  }, 300);
}

// Enhanced work card interactions
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => {
    const videoId = card.dataset.video;
    if (videoId) {
      openVideoModal(videoId);
    }
  });
  
  // Add keyboard support
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const videoId = card.dataset.video;
      if (videoId) {
        openVideoModal(videoId);
      }
    }
  });
});

// Prevent video modal when clicking on interactive elements inside cards
document.querySelectorAll('.work-card .know-more, .work-card a, .work-card button').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  el.addEventListener('keydown', (e) => {
    e.stopPropagation();
  });
});

// Close modal when clicking outside
document.getElementById('videoModal').addEventListener('click', (e) => {
  if (e.target.id === 'videoModal') {
    closeVideoModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('videoModal');
    if (modal.style.display === 'block') {
      closeVideoModal();
    }
  }
});

// Scroll progress bar & back-to-top button
const progressBar = document.getElementById('scroll-progress');
const backToTopBtn = document.getElementById('back-to-top');

function updateScrollUI() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = progress + '%';
  if (backToTopBtn) backToTopBtn.style.display = scrollTop > 400 ? 'flex' : 'none';
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);
updateScrollUI();

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Subtle parallax/tilt on work-card images
document.querySelectorAll('.work-card').forEach(card => {
  const img = card.querySelector('img');
  if (!img) return;
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    img.style.transform = `scale(1.03) translate(${x * 6}px, ${y * 6}px)`;
  });
  card.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1) translate(0,0)';
  });
});

// Enhanced button micro-interactions with premium feedback
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('mousedown', () => {
    btn.style.transform = 'scale(0.98)';
    btn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
  });
  
  btn.addEventListener('mouseup', () => {
    btn.style.transform = '';
    btn.style.boxShadow = '';
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.boxShadow = '';
  });
  
  // Add focus states for accessibility
  btn.addEventListener('focus', () => {
    btn.style.outline = '2px solid #E60000';
    btn.style.outlineOffset = '2px';
  });
  
  btn.addEventListener('blur', () => {
    btn.style.outline = '';
    btn.style.outlineOffset = '';
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Enhanced metric card counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.metric-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const increment = target / 50;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + '%';
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target + '%';
      }
    };
    
    updateCounter();
  });
}

// Trigger counter animation when metrics section is in view
const metricsSection = document.querySelector('.metrics-section');
if (metricsSection) {
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        metricsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  metricsObserver.observe(metricsSection);
}

// Enhanced hover effects for cards with premium interactions
document.querySelectorAll('.metric-card, .work-card, .blog-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Add premium glow effect
    card.style.boxShadow = card.classList.contains('metric-card') 
      ? '0 16px 48px rgba(230, 0, 0, 0.2)' 
      : card.classList.contains('work-card')
      ? '0 16px 48px rgba(0, 27, 45, 0.2)'
      : '0 16px 48px rgba(0, 27, 45, 0.15)';
    
    card.style.transform = card.classList.contains('metric-card') 
      ? 'translateY(-8px) scale(1.02)' 
      : card.classList.contains('work-card')
      ? 'scale(1.05) translateY(-8px)'
      : 'translateY(-6px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple effect to primary buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn-primary {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);
