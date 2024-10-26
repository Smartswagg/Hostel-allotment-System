document.getElementById('loginButton').addEventListener('click', function(event) {
   
    event.preventDefault();

  
    const adminId = document.getElementById('adminId').value;
    const password = document.getElementById('password').value;

   
    if (adminId.trim() === '' || password.trim() === '') {
        alert('Please enter both Admin ID and Password.');
    } else {
        
        window.location.href = 'dashboard.html';
    }
});