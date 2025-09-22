// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
    
    // Change icon
    const icon = this.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-times';
    } else {
        icon.className = 'fa-solid fa-bars';
    }
});

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.querySelector('i').className = 'fa-solid fa-bars';
    }
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Checking for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  body.setAttribute('data-theme', 'dark');
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// Theme toggle event listener
themeToggle.addEventListener('click', function () {
  const currentTheme = body.getAttribute('data-theme');

  if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  }
});

// Tab functionality for seasonal produce
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', function () {
    const targetTab = this.getAttribute('data-tab');

    // Removing active class from all buttons and content
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    this.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  })
})

// FAQ accordion functionality
const fagQuestions = document.querySelectorAll('.faq-question');

fagQuestions.forEach(question => {
  question.addEventListener('click', function () {
    const faqItem = this.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const faqIcon = this.querySelector('.faq-icon');

    // Toggling current FAQ
    faqAnswer.classList.toggle('active');
    faqIcon.classList.toggle('rotate');

  });
});

// Contact form validations 
const contactForm = document.getElementById('contactForm');
const formInputs = {
  fullName: document.getElementById('fullName'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  produceType: document.getElementById('produceType'),
  quantity: document.getElementById('quantity'),
  message: document.getElementById('message'),
};

// Validation functions
function validateName(name) {
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name.trim());
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateQuantity(quantity) {
  const num = parseInt(quantity);
  return num >= 1 && num <= 1000;
}

// Showing validation result
function showValidationResult(inputName, isValid, errorMessage = '') {
  const input = formInputs[inputName];
  const errorElement = document.getElementById(`${inputName}Error`);
  const successElement = document.getElementById(`${inputName}Success`);

  if (isValid) {
    input.classList.remove('input-invalid');
    input.classList.add('input-valid');
    if (errorElement) errorElement.style.display = 'none';
    if (successElement) successElement.style.display = 'block';
  } else {
    input.classList.remove('input-valid');
    input.classList.add('input-invalid');
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
    }
    if (successElement) successElement.style.display = 'none';
  }
}

// Real-time validations
formInputs.fullName.addEventListener('input', function () {
  showValidationResult('fullName', validateName(this.value), 'Name must be at least 2 characters and contain only letters and spaces.');
});

formInputs.email.addEventListener('input', function () {
  showValidationResult('email', validateEmail(this.value), 'Please enter a valid email address.');
});

formInputs.phone.addEventListener('input', function () {
  showValidationResult('phone', validatePhone(this.value), 'Please enter a valid phone number (at least 10 digits).');
});

formInputs.produceType.addEventListener('change', function () {
  showValidationResult('produceType', this.value !== '', 'Please select a produce type.');
});

formInputs.quantity.addEventListener('input', function () {
  if (this.value === '') {
    this.classList.remove('input-valid', 'input-invalid');
    document.getElementById('quantityError').style.display = 'none';
    document.getElementById('quantitySuccess').style.display = 'none';
  } else {
    showValidationResult('quantity', validateQuantity(this.value), 'Quantity must be between 1 and 1000 kg.');
  }
});

formInputs.message.addEventListener('input', function () {
  document.getElementById('messageSuccess').style.display = this.value.trim() !== '' ? 'block' : 'none';
});

// Form submission
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const validations = {
    fullName: validateName(formInputs.fullName.value),
    email: validateEmail(formInputs.email.value),
    phone: validatePhone(formInputs.phone.value),
    produceType: formInputs.produceType.value !== '',
    quantity: formInputs.quantity.value === '' || validateQuantity(formInputs.quantity.value)
  };

  showValidationResult('fullName', validations.fullName, 'Name must be at least 2 characters and contain only letters and spaces.');
  showValidationResult('email', validations.email, 'Please enter a valid email address.');
  showValidationResult('phone', validations.phone, 'Please enter a valid phone number.');
  showValidationResult('produceType', validations.produceType, 'Please select a produce type.');
  if (formInputs.quantity.value !== '') {
    showValidationResult('quantity', validations.quantity, 'Quantity must be between 1 and 1000 kg.');
  }

  const allValid = Object.values(validations).every(v => v === true);
  if (allValid) {
    document.getElementById('formSuccess').style.display = 'block';

    setTimeout(() => {
      contactForm.reset();
      Object.values(formInputs).forEach(input => {
        input.classList.remove('input-valid', 'input-invalid');
      });
      document.querySelectorAll('.error-message, .success-message').forEach(msg => {
        msg.style.display = 'none';
      });
      document.getElementById('formSuccess').style.display = 'none';
    }, 3000);

    contactForm.scrollIntoView({ behavior: 'smooth' });
  } else {
    const firstInvalid = contactForm.querySelector('.input-invalid');
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});