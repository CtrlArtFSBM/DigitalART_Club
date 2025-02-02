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
const formOutput = document.getElementById('formOutput'); // Assuming you have a div with id 'formOutput' for showing messages

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      formOutput.innerHTML = `<p class="success-message">Form submitted successfully!</p>`;
      form.reset(); // Clear the form
    } else {
      formOutput.innerHTML = `<p class="error-message">An error occurred. Please try again.</p>`;
    }
  } catch (error) {
    formOutput.innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
  }
});

