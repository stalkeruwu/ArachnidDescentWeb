import API_BASE_URL from './config.js';
(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch(`${API_BASE_URL}/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
            messageDiv.textContent = data.message || 'Email verified successfully!';
        } else {
            messageDiv.textContent = data.error || 'Error verifying email.';
        }
    } catch (error) {
        messageDiv.textContent = 'An unexpected error occurred.';
    }
})();