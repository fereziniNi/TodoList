<?php
// Recuperando Id e conectando no BD
include_once("dbconnect.php");
$id = $_GET['id'];
// Status Completo
$status = "completed";
$sql = "UPDATE tasks SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "Erro na preparação da query: " . $conn->error]);
    exit();
}

$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "A sua tarefa foi finalizada!"]);
    die();
} else {
    echo json_encode(["error" => "Erro ao finalizar a tarefa: " . $stmt->error]);
    die();
}

$stmt->close();
$conn->close();
?>
