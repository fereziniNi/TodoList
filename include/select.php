<?php
// Incluindo BD
include_once("dbconnect.php");

// Escolhendo tarefas que o usuário não completou!
$sql = "SELECT * FROM tasks WHERE status = 'pending' ORDER BY id ASC; ";
$query = mysqli_query($conn, $sql);
$output = [];
if (mysqli_num_rows($query) > 0) {
    while ($row = mysqli_fetch_assoc($query)) {
        $output[] = $row;
    }
} else {
    $output["empty"] = "empty";
}
echo json_encode($output);
?>