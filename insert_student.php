<?php
include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $indexNo = $_POST['indexNo'];
    $course = $_POST['course'];

    $sql = "INSERT INTO students (name, index_no, course) VALUES ('$name', '$indexNo', '$course')";

    if ($conn->query($sql) === TRUE) {
        echo "Success";
    } else {
        echo "Error: " . $conn->error;
    }
}
$conn->close();
?>