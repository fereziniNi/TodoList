<?php
// Receber dados e Salvar no Bd
$input = file_get_contents("php://input");
$decode = json_decode($input, true);

include_once("dbconnect.php");
// Proteção SQL INJECTION -> STMT
$stmt = $conn->prepare("INSERT INTO `tasks` (`title`, `description`, `status`) VALUES (?, ?, ?)");
if (!$stmt) {
    echo json_encode(["error" => "Erro na preparação do statement: " . $conn->error]);
    exit();
}
// Lendo arquivo JSON
$titulo = $decode["titulo"];
$desc = $decode["desc"];
$status = 'pending';

$stmt->bind_param("sss", $titulo, $desc, $status);

if ($stmt->execute()) {
    echo json_encode(["message" => "Tarefa Inserida com sucesso!"]);
} else {
    echo json_encode(["error" => "Erro ao inserir tarefa: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
