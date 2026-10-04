document.addEventListener('DOMContentLoaded', loadStudents);

let editingId = null; // To track if we are editing an existing record

document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const indexNo = document.getElementById('indexNo').value;
    const course = document.getElementById('course').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('indexNo', indexNo);
    formData.append('course', course);

    let url = 'insert_student.php';
    
    // Change URL to update if editingId exists
    if (editingId) {
        formData.append('id', editingId);
        url = 'update_student.php';
    }

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if(data.trim() === 'Success') {
            alert(editingId ? 'Student updated successfully!' : 'Student added successfully!');
            document.getElementById('studentForm').reset();
            document.getElementById('submitBtn').innerText = 'Add Student';
            editingId = null;
            loadStudents(); 
        } else {
            alert('Error: ' + data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function loadStudents() {
    fetch('fetch_students.php')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('studentTableBody');
        tableBody.innerHTML = '';
        
        data.forEach(student => {
            const row = `<tr>
                <td>${student.name}</td>
                <td>${student.index_no}</td>
                <td>${student.course}</td>
                <td>
                    <button class="btn-edit" onclick="editStudent(${student.id}, '${student.name}', '${student.index_no}', '${student.course}')">Edit</button>
                    <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteStudent(id) {
    if(confirm('Are you sure you want to delete this student?')) {
        const formData = new FormData();
        formData.append('id', id);

        fetch('delete_student.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if(data.trim() === 'Success') {
                alert('Student deleted successfully!');
                loadStudents(); 
            } else {
                alert('Error: ' + data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function editStudent(id, name, indexNo, course) {
    // Load data into the form
    document.getElementById('name').value = name;
    document.getElementById('indexNo').value = indexNo;
    document.getElementById('course').value = course;
    
    editingId = id;
    document.getElementById('submitBtn').innerText = 'Update Student'; // Change button text
}