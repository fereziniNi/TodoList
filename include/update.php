<?php
// Lendo Informações enviadas por JSON
$input = file_get_contents("php://input");
$decode = json_decode($input, true);

include_once("dbconnect.php");

// Proteção SQL INJECTION -> STMT
$sql = "UPDATE tasks SET title = ?, description = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "Erro na preparação da query: " . $conn->error]);
    exit();
}

$id = $decode["id"];
$title = $decode["title"];
$description = $decode["desc"];

// Fazendo o bind dos parâmetros
$stmt->bind_param("ssi", $title, $description, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "A sua tarefa foi alterada!"]);
} else {
    echo json_encode(["error" => "Erro ao alterar tarefa: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
