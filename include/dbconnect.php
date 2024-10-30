<?php
    // Configure o login para o Banco de Dados
    $host = "localhost";
    $user = "root";
    $password = ""; 
    $dbname = "task_manager";

    // Testando a conexão!
    $conn = new mysqli($host, $user, $password, $dbname);

    if ($conn->connect_error) {
        die("Error: " . $conn->connect_error);
    }
?>
