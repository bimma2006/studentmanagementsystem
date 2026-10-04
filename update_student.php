<?php
include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $indexNo = $_POST['indexNo'];
    $course = $_POST['course'];

    $sql = "UPDATE students SET name='$name', index_no='$indexNo', course='$course' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo "Success";
    } else {
        echo "Error: " . $conn->error;
    }
}
$conn->close();
?>