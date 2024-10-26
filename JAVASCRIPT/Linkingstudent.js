document.getElementById('loginButton').addEventListener('click', function(event) {
   
    event.preventDefault();

    
    const studentId = document.getElementById('studentId').value;
    const password = document.getElementById('password').value;

   
    if (studentId.trim() === '' || password.trim() === '') {
        alert('Please enter both Student ID and Password.');
    } else {
       
        window.location.href = 'form.html';
    }
});