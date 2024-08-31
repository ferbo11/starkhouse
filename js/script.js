document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Welcome back, ' + document.getElementById('username').value + '!');
});
