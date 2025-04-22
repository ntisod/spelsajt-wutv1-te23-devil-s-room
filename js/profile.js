document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // Load user data
    const username = localStorage.getItem('username') || 'Användare';
    const email = localStorage.getItem('userEmail') || 'email@example.com';
    const memberSince = localStorage.getItem('memberSince') || new Date().getFullYear();
    const savedAvatar = localStorage.getItem('userAvatar');
    const defaultAvatar = '../images/default-avatar.png';

    // Update profile information
    document.getElementById('profile-username').textContent = username;
    document.getElementById('profile-email').textContent = email;
    document.getElementById('member-since').textContent = memberSince;

    // Load saved avatar if exists
    const avatarImg = document.getElementById('profile-avatar');
    if (savedAvatar) {
        avatarImg.src = savedAvatar;
    } else {
        avatarImg.src = defaultAvatar;
    }

    // Handle avatar upload
    const avatarInput = document.getElementById('avatar-input');
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                showMessage('Vänligen välj en bildfil', 'error');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showMessage('Bilden får inte vara större än 5MB', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(event) {
                avatarImg.src = event.target.result;
                // Save avatar to localStorage
                localStorage.setItem('userAvatar', event.target.result);
                showMessage('Profilbild uppdaterad', 'success');
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle avatar removal
    const removeAvatarBtn = document.getElementById('remove-avatar');
    removeAvatarBtn.addEventListener('click', function() {
        // Remove avatar from localStorage
        localStorage.removeItem('userAvatar');
        // Reset to default avatar
        avatarImg.src = defaultAvatar;
        showMessage('Profilbild borttagen', 'success');
    });

    // Pre-fill settings form
    document.getElementById('update-username').value = username;
    document.getElementById('update-email').value = email;

    // Handle settings form submission
    const settingsForm = document.getElementById('settings-form');
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newUsername = document.getElementById('update-username').value;
        const newEmail = document.getElementById('update-email').value;
        const newPassword = document.getElementById('update-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const notifications = document.getElementById('notifications').checked;

        // Validate form
        if (newPassword && newPassword !== confirmPassword) {
            showMessage('Lösenorden matchar inte', 'error');
            return;
        }

        // Update user information
        localStorage.setItem('username', newUsername);
        localStorage.setItem('userEmail', newEmail);
        if (newPassword) {
            // In a real application, you would hash the password and send it to a server
            localStorage.setItem('password', newPassword);
        }
        localStorage.setItem('notifications', notifications);

        // Update display
        document.getElementById('profile-username').textContent = newUsername;
        document.getElementById('profile-email').textContent = newEmail;

        showMessage('Inställningarna har sparats', 'success');
    });
});

// Helper function to show messages
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;

    const container = document.querySelector('.profile-container');
    container.insertBefore(messageDiv, container.firstChild);

    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Delete account confirmation
function confirmDeleteAccount() {
    if (confirm('Är du säker på att du vill radera ditt konto? Detta kan inte ångras.')) {
        // Clear all user data
        localStorage.clear();
        // Redirect to home page
        window.location.href = '../index.html';
    }
} 