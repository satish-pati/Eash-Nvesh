const loginForm = document.getElementById('login-form');
const message = document.getElementById('message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://render-nl4l.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            chrome.storage.local.set({ isLoggedIn: true, username: username }, () => {
                message.textContent = 'Login successful!';
                // Redirect to the restricted page
                window.location.href = "https://www.google.com/";
            });
            message.textContent = 'Login successful!';
            
        } else {
            message.textContent = 'Invalid credentials';
        }
    } catch (error) {
        message.textContent = 'Error logging in';
    }
});
