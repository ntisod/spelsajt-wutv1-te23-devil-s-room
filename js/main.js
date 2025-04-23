document.addEventListener('DOMContentLoaded', () => {
    // Check login status and update navigation
    function updateNavigation() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const navLinks = document.querySelector('.nav-links');
        const loginLink = navLinks.querySelector('a[href*="login.html"], a[href="login.html"]');

        if (loginLink && isLoggedIn) {
            loginLink.textContent = 'Min Profil';
            // Handle paths for different page locations
            if (window.location.pathname.includes('pages/')) {
                loginLink.href = 'profile.html';
            } else {
                loginLink.href = 'pages/profile.html';
            }
        }
    }

    // Initial update
    updateNavigation();

    // Listen for login state changes
    document.addEventListener('loginStateChanged', updateNavigation);

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuBtn) {
        // Toggle menu
        function toggleMenu() {
            mobileMenuBtn.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
        }

        mobileMenuBtn.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                toggleMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinksContainer.classList.contains('active') &&
                !navLinksContainer.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)) {
                toggleMenu();
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation to feature cards on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Handle logout button in footer if it exists
    const logoutButton = document.querySelector('button[onclick="logout()"]');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = window.location.pathname.includes('pages/') ? '../index.html' : 'index.html';
        });
    }
}); 