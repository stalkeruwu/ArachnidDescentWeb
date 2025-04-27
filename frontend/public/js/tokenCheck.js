// Function to check if a token is expired
function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return payload.exp < currentTime; // Check if the token is expired
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // Treat invalid tokens as expired
    }
}

// Function to handle expired tokens
function handleExpiredToken() {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    if (token && isTokenExpired(token)) {
        console.log('Token is expired. Removing it from localStorage.');
        localStorage.removeItem('authToken'); // Remove the expired token

        // Use SweetAlert to notify the user
        Swal.fire({
            icon: 'warning',
            title: 'Session Expired',
            text: 'Your session has expired. Please log in again.',
            confirmButtonText: 'OK',
        }).then(() => {
            window.location.href = 'login.html'; // Redirect to login page after user acknowledges
        });
    }
}

// Periodically check for expired tokens every 60 seconds
setInterval(handleExpiredToken, 60000); // 60000 ms = 60 seconds

// Initial check when the page loads
handleExpiredToken();