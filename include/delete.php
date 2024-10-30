<?php
// Receber dados para deletar no Bd
$id = $_GET['id'];
include_once("dbconnect.php");

// Proteção SQL INJECTION -> STMT
$stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
if (!$stmt) {
    echo json_encode(["error" => "Erro na preparação da query: " . $conn->error]);
    exit();
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Tarefa Deletada"]);
} else {
    echo json_encode(["error" => "Erro ao deletar tarefa: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
