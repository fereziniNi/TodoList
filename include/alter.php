<?php
// Conexão BD
include_once("dbconnect.php");

// Recuperando id específico
if (isset($_GET["id"])) {
    $id = $_GET["id"];
    $sql = "SELECT * FROM tasks WHERE id='{$id}'";
    $query = mysqli_query($conn, $sql);
    $output = [];
    if (mysqli_num_rows($query) > 0) {
        while ($row = mysqli_fetch_assoc($query)) {
            // Montando Array
            $output[] = $row;
        }
    } else {
        $output["empty"] = "empty";
    }
    echo json_encode($output);
}
?>