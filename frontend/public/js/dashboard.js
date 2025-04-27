import API_BASE_URL from './config.js';
// Check if the user is logged in
const token = localStorage.getItem('authToken'); // Replace 'authToken' with your actual token key

if (!token) {
// If no token is found, redirect to the login page
window.location.href = 'login.html';
} else {
// Optionally, validate the token with the backend
fetch(`${API_BASE_URL}/auth/check-token`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
    },
})
    .then((response) => {
        if (!response.ok) {
            // If the token is invalid, redirect to the login page
            window.location.href = 'login.html';
        }
        else {
            // Token is valid, proceed with loading the dashboard
            console.log('Token is valid. Welcome to your dashboard!');
            document.getElementById('dashboardLink').style.display = 'block';
        }
    })
    .catch((error) => {
        console.error('Error validating token:', error);
        window.location.href = 'login.html';
    });
}

function logout() {
localStorage.removeItem('authToken'); // Remove the token
window.location.href = 'login.html'; // Redirect to login page
}

document.getElementById('logoutButton').addEventListener('click', logout); // Attach the logout function to the button