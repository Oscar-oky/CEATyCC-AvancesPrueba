<?php
header('Content-Type: application/json');

// Configuración de conexión
$conexion = new mysqli('localhost', 'root', 'admin', 'bdceatycc');
$conexion->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5);

if ($conexion->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Error de conexión: ' . $conexion->connect_error]));
}

// Verificar tabla
$result = $conexion->query("SHOW TABLES LIKE 'contactos'");
if ($result->num_rows == 0) {
    die(json_encode(['success' => false, 'message' => 'La tabla contactos no existe']));
}

// Procesar archivo adjunto
$archivoRuta = null;
if(isset($_FILES['archivo']) && $_FILES['archivo']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'uploads/';
    if(!is_dir($uploadDir)) mkdir($uploadDir);
    $archivoRuta = $uploadDir . basename($_FILES['archivo']['name']);
    move_uploaded_file($_FILES['archivo']['tmp_name'], $archivoRuta);
}

// Insertar datos
$stmt = $conexion->prepare("INSERT INTO contactos (nombre, email, telefono, asunto, mensaje, privacidad, preferencia, archivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$privacidad = isset($_POST['privacidad']) ? 1 : 0;
$stmt->bind_param("sssssiss", $_POST['nombre'], $_POST['email'], $_POST['telefono'], $_POST['asunto'], $_POST['mensaje'], $privacidad, $_POST['preferencia'], $archivoRuta);

if($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado', 'id' => $stmt->insert_id]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar: ' . $stmt->error]);
}

$conexion->close();
?>