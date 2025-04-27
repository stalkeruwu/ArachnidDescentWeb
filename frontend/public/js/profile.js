import API_BASE_URL from './config.js';

// Logout function
function logout() {
    localStorage.removeItem('authToken'); // Remove the token
    window.location.href = 'login.html'; // Redirect to login page
}

// Update Email
document.getElementById('updateEmailForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    const newEmail = document.getElementById('newEmail').value;

    try {
        const response = await fetch(`${API_BASE_URL}/user/update-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ email: newEmail }),
        });

        const data = await response.json();
        if (response.ok) {
            // Notify the user about the email update and logout
            Swal.fire({
                icon: 'info',
                title: 'Email Updated',
                text: 'Your email has been updated successfully. Please verify your new email address. You will now be logged out.',
            }).then(() => {
                // Log out the user
                localStorage.removeItem('authToken'); // Remove the token
                window.location.href = 'login.html'; // Redirect to login page
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.error || 'Failed to update email.',
            });
        }
    } catch (error) {
        console.error('Error updating email:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred. Please try again later.',
        });
    }
});

// Update Password
document.getElementById('updatePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'New password and confirmation do not match.',
        });
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/user/update-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await response.json();
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Password Changed',
                text: 'Your password has been updated successfully.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.error || 'Failed to update password.',
            });
        }
    } catch (error) {
        console.error('Error updating password:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred. Please try again later.',
        });
    }
});