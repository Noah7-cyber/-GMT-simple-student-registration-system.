// In-memory array to store students
let students = [];

// Get DOM elements
const form = document.getElementById('registrationForm');
const studentsList = document.getElementById('studentsList');
const errorMessage = document.getElementById('error-message');

// Form submission event listener
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value.trim();

    // Clear previous error messages
    errorMessage.textContent = '';

    // Validation
    if (!name || !email || !course) {
        errorMessage.textContent = 'All fields are required.';
        return;
    }

    if (!validateEmail(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    // Add student to array
    const student = { name, email, course };
    students.push(student);

    // Update the UI
    renderStudents();

    // Clear the form
    form.reset();
});

// Basic email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to render the list of registered students
function renderStudents() {
    // Clear the current list
    studentsList.innerHTML = '';

    // Add each student as a list item safely to avoid XSS
    students.forEach((student, index) => {
        const li = document.createElement('li');

        const nameSpan = document.createElement('span');
        nameSpan.innerHTML = '<strong>Name:</strong> ';
        nameSpan.appendChild(document.createTextNode(student.name));

        const emailSpan = document.createElement('span');
        emailSpan.innerHTML = '<strong>Email:</strong> ';
        emailSpan.appendChild(document.createTextNode(student.email));

        const courseSpan = document.createElement('span');
        courseSpan.innerHTML = '<strong>Course:</strong> ';
        courseSpan.appendChild(document.createTextNode(student.course));

        li.appendChild(nameSpan);
        li.appendChild(emailSpan);
        li.appendChild(courseSpan);

        studentsList.appendChild(li);
    });
}