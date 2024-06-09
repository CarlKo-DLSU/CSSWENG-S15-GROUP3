document.getElementById('sign-in-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('sign-in-email').value;
    const password = document.getElementById('sign-in-password').value;

    // Hardcoded admin credentials
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'DLSU123';

    if (email === adminEmail && password === adminPassword) {
        alert('Welcome, Admin!');
        // Redirect to admin dashboard or perform other admin-specific actions
        window.location.href = '4-admin-homepage.html';
    } else {
        // Perform regular sign-in logic here
        alert('Invalid login credentials.');
    }
});