const loginForm = document.getElementById('login-form');
const message = document.getElementById('message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
     // Check if the username is numeric
     if (/^\d+$/.test(username)) {
        message.textContent = 'Username cannot be only numbers.';
        return;
    }
    message.textContent = 'Fetching data...';


    try {
        const response = await fetch('https://render-nl4l.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            chrome.storage.local.set({ isLoggedIn: true, username: username }, () => {
                message.textContent = 'Login successful!';
                // Redirect to page
                window.history.back();
            });
            message.textContent = 'Login successful!';
            
        } else {
            message.textContent = 'Invalid credentials';
        }
    } catch (error) {
        message.textContent = 'Error logging in';
    }
});
