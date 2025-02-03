// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-title, .hero-subtitle", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2
});

gsap.utils.toArray(".mission-card, .vision-card, .bureau-card, .activity-card").forEach(element => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: "top 80%"
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
});



// Form Submission
const form = document.querySelector('.contact-form');
const formOutput = document.getElementById('formOutput'); // Make sure this exists in your HTML
const submitButton = form.querySelector('button[type="submit"]'); // Reference to the submit button

form.addEventListener('submit', async (e) => {
  e.preventDefault();  // Prevent the default form submission

  const formData = new FormData(form);

  // Update button state to indicate submission is in progress
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  try {
    // Note the use of mode: 'no-cors'
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      },
      mode: 'no-cors' // Required for cross-origin requests with Formspree
    });

    // Because of no-cors, we cannot rely on response.ok
    // If no error is thrown, assume success:
    formOutput.innerHTML = `<p class="success-message">Form submitted successfully!</p>`;
    form.reset(); // Clear the form
  } catch (error) {
    // If there's a network error, it will be caught here
    formOutput.innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
  }

  // Reset the button after a short delay
  setTimeout(() => {
    submitButton.textContent = 'Send Message';
    submitButton.disabled = false;
  }, 2000);
});
