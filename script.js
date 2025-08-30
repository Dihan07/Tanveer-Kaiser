// Original menu functionality
const menu = document.querySelector("#menu");
const nav = document.querySelector(".links");

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    nav.classList.toggle('active');
}

// Typing effect functionality
const typingElement = document.getElementById('typing-text');
const texts = [' A Data Science Enthusiast', ' Aspiring SQA Engineer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start the typing effect when the page loads
document.addEventListener('DOMContentLoaded', typeWriter);

// STEP 6: Replace your entire JavaScript code with this

// Initialize EmailJS with your public key
emailjs.init('_1O8PdZgM3Db5CACo'); // Replace with your actual public key from EmailJS dashboard

// Submit function for the div button
function submitForm() {
    document.getElementById('contactForm').dispatchEvent(new Event('submit'));
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous error messages
    clearErrors();
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Validate full name
    if (fullName === '') {
        showError('nameError', 'Full name is required');
        addErrorStyle('fullName');
        isValid = false;
    } else if (fullName.length < 2) {
        showError('nameError', 'Full name must be at least 2 characters');
        addErrorStyle('fullName');
        isValid = false;
    }
    
    // Validate email
    if (email === '') {
        showError('emailError', 'Email is required');
        addErrorStyle('email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        addErrorStyle('email');
        isValid = false;
    }
    
    // Validate message
    if (message === '') {
        showError('messageError', 'Message is required');
        addErrorStyle('message');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        addErrorStyle('message');
        isValid = false;
    }
    
    // If all validations pass, send email
    if (isValid) {
        // Show loading state
        showLoading();
        
        // Send email using EmailJS
        emailjs.send('service_ngvpqhj', 'template_v1tubgs', {
            from_name: fullName,
            from_email: email,
            message: message
        })
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            showSuccess();
        })
        .catch(function(error) {
            console.log('Email sending failed:', error);
            showError('successMessage', 'Sorry, there was an error sending your message. Please try again.');
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Clear all error messages and styles
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.textContent = '');
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('input-error'));
    
    document.getElementById('successMessage').textContent = '';
}

// Show error message
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Add error styling to input
function addErrorStyle(inputId) {
    document.getElementById(inputId).classList.add('input-error');
}

// Show loading state
function showLoading() {
    document.getElementById('successMessage').textContent = 'Sending message...';
    document.getElementById('successMessage').style.color = '#2196F3'; // Blue color for loading
}

// Show success message
function showSuccess() {
    document.getElementById('successMessage').textContent = 'Thank you! Your message has been sent successfully.';
    document.getElementById('successMessage').style.color = '#388e3c'; // Green color for success
    document.getElementById('contactForm').reset();
}

// Remove error styling when user starts typing
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('input-error');
        const errorId = this.id + 'Error';
        if (document.getElementById(errorId)) {
            document.getElementById(errorId).textContent = '';
        }
    });
});