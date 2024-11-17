const registerForm = document.getElementById('register-form');
const message = document.getElementById('message');


registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (/^\d+$/.test(username)) {
        message.textContent = 'Username cannot be only numbers.';
        return;
    }
    try {
        const response = await fetch('https://render-nl4l.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            message.textContent = 'Registration successful! You can now log in.';
        } else {
            message.textContent = 'User already exists or registration failed';
        }
    } catch (error) {
        message.textContent = 'Error registering user';
    }
});
