// Logout function - globally accessible
function logout() {
    localStorage.clear();
    window.location.href = '../index.html';  // Redirect to home page after logout
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.body.classList.add('logged-in');
        const userEmail = localStorage.getItem('userEmail');
        updateUIForLoggedInUser(userEmail);
    }

    // Password validation
    const passwordInput = document.getElementById('register-password');
    const requirements = {
        length: document.getElementById('length'),
        symbol: document.getElementById('symbol'),
        number: document.getElementById('number'),
        capital: document.getElementById('capital')
    };

    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            
            // Check each requirement
            requirements.length.classList.toggle('valid', password.length >= 12);
            requirements.symbol.classList.toggle('valid', /[!@#$%^&*]/.test(password));
            requirements.number.classList.toggle('valid', /[0-9]/.test(password));
            requirements.capital.classList.toggle('valid', /[A-Z]/.test(password));
        });
    }

    // Tab switching functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            const formId = `${tab.getAttribute('data-tab')}-form`;
            document.getElementById(formId).classList.add('active');
        });
    });

    // Form validation and submission
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const remember = document.querySelector('input[name="remember"]').checked;

            // Basic validation
            if (!email || !password) {
                showError(loginForm, 'Vänligen fyll i alla fält');
                return;
            }

            // Simulate login
            simulateLogin(email, password, remember);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const terms = document.querySelector('input[name="terms"]').checked;

            // Clear previous error messages
            clearErrors(registerForm);

            // Validation
            if (!username || !email || !password || !confirmPassword) {
                showError(registerForm, 'Vänligen fyll i alla fält');
                return;
            }

            if (password !== confirmPassword) {
                showError(registerForm, 'Lösenorden matchar inte');
                return;
            }

            if (password.length < 12) {
                showError(registerForm, 'Lösenordet måste vara minst 12 tecken långt');
                return;
            }

            if (!terms) {
                showError(registerForm, 'Du måste acceptera användarvillkoren');
                return;
            }

            // Simulate registration
            simulateRegistration(username, email, password);
        });
    }
});

// Helper functions
function showError(form, message) {
    clearErrors(form);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    form.insertBefore(errorDiv, form.firstChild);
}

function clearErrors(form) {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
}

function showSuccess(form, message) {
    clearErrors(form);
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    form.insertBefore(successDiv, form.firstChild);
}

// Simulated API calls
function simulateLogin(email, password, remember) {
    // Show loading state
    const submitButton = document.querySelector('#login-form button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Loggar in...';
    submitButton.disabled = true;

    // Simulate API delay
    setTimeout(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Simulate successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('memberSince', new Date().getFullYear());
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        }

        // Show success message and update UI
        showSuccess(document.getElementById('login-form'), 'Inloggning lyckades!');
        document.body.classList.add('logged-in');
        updateUIForLoggedInUser(email);
    }, 1500);
}

function simulateRegistration(username, email, password) {
    // Show loading state
    const submitButton = document.querySelector('#register-form button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Registrerar...';
    submitButton.disabled = true;

    // Simulate API delay
    setTimeout(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Simulate successful registration
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('username', username);
        localStorage.setItem('memberSince', new Date().getFullYear());

        // Show success message and update UI
        showSuccess(document.getElementById('register-form'), 'Registrering lyckades!');
        document.body.classList.add('logged-in');
        updateUIForLoggedInUser(email);
    }, 1500);
}

function updateUIForLoggedInUser(email) {
    // Add logged-in class to body
    document.body.classList.add('logged-in');

    // Hide the login/register forms if they exist
    const authForms = document.querySelector('.auth-forms');
    if (authForms) {
        authForms.style.display = 'none';
    }

    // Show welcome message
    const existingWelcome = document.querySelector('.welcome-message');
    if (!existingWelcome) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-message';
        welcomeDiv.innerHTML = `
            <h2>Välkommen!</h2>
            <p>Du är nu inloggad som ${email}</p>
            <button onclick="window.logout()" class="auth-button">Logga ut</button>
        `;

        const authContainer = document.querySelector('.auth-container');
        if (authContainer) {
            authContainer.appendChild(welcomeDiv);
        }
    }

    // Update navigation menu
    const event = new Event('loginStateChanged');
    document.dispatchEvent(event);
}

// Global logout function
window.logout = function() {
    // Clear all user data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    localStorage.removeItem('memberSince');
    localStorage.removeItem('rememberMe');

    // Remove logged-in class from body
    document.body.classList.remove('logged-in');

    // Remove welcome message if it exists
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    // Show auth forms if they exist
    const authForms = document.querySelector('.auth-forms');
    if (authForms) {
        authForms.style.display = 'block';
    }

    // Update navigation menu
    const event = new Event('loginStateChanged');
    document.dispatchEvent(event);

    // Clear any success/error messages
    const messages = document.querySelectorAll('.success-message, .error-message');
    messages.forEach(msg => msg.remove());
};

// Check login state on page load
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        const email = localStorage.getItem('userEmail');
        updateUIForLoggedInUser(email);
    }
}); 