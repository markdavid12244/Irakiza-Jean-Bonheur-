// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const yearSpan = document.getElementById('year');
const fareForm = document.getElementById('fareForm');
const distanceInput = document.getElementById('distance');
const distanceError = document.getElementById('distanceError');
const fareAmount = document.getElementById('fareAmount');
const downloadBtn = document.getElementById('downloadCV');
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

// Set current year in footer
yearSpan.textContent = new Date().getFullYear();

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Calculator: Musanze Transport Fare Estimator
function calculateFare(distance) {
    if (distance < 0) return null;
    // Fare structure: 500 RWF base for first 2km, then 300 RWF per additional km
    if (distance <= 2) {
        return 500;
    } else {
        return 500 + (distance - 2) * 300;
    }
}

fareForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const distance = parseFloat(distanceInput.value);
    
    // Validation
    distanceError.textContent = '';
    if (isNaN(distance) || distance < 0) {
        distanceError.textContent = 'Please enter a valid positive distance.';
        fareAmount.textContent = '—';
        return;
    }
    
    const fare = calculateFare(distance);
    fareAmount.textContent = fare.toFixed(0);
});

// Download CV as text file
downloadBtn.addEventListener('click', () => {
    const cvContent = `ALICE UWASE - CV
=======================
Education: BSc Computer Science (Year 2), Faculty of Sciences and IT
Skills: HTML, CSS, JavaScript, Git, Bootstrap, Responsive Design
Experience: Intern at Musanze Tech Hub (Summer 2025)
Languages: English, Kinyarwanda, French
`;
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Alice_Uwase_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Contact form validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Name validation
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }
    
    // Email validation
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    
    // Message validation
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required.';
        isValid = false;
    } else {
        messageError.textContent = '';
    }
    
    if (isValid) {
        formSuccess.textContent = 'Message sent successfully! (Demo)';
        contactForm.reset();
        setTimeout(() => {
            formSuccess.textContent = '';
        }, 3000);
    }
});

// Smooth scrolling for anchor links (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});