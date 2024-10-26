
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {

  e.preventDefault();


  const name = document.getElementById('name').value;
  const rollno = document.getElementById('rollno').value;
  const branch = document.getElementById('branch').value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const contactno = document.getElementById('contactno').value;
  const periodofstay = document.getElementById('periodofstay').value;
  const messfacility = document.getElementById('messfacility').checked;

 
  if (name === '' || rollno === '' || branch === '' || gender === null || contactno === '' || periodofstay === '') {
    alert('Please fill in all the required fields.');
  } else {
    
    form.action = 'roompage.html';
    form.submit();
  }
});