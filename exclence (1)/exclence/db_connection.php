<?php
// Database configuration
$db_host = 'localhost';     // Database host
$db_user = 'root';         // Database user
$db_password = '';         // Database password
$db_name = 'cipherthon';   // Database name

// Create connection
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8mb4
$conn->set_charset("utf8mb4");
?> 