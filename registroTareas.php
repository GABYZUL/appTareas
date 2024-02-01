<?php
// Configuración básica de registros en una aplicación de registro de eventos de adiciones de tareas

// Establecer la zona horaria para las marcas de tiempo
date_default_timezone_set('America/New_York');

// Configuración de registros
ini_set('error_log', __DIR__ . '/tareas.log');
ini_set('log_errors', 1);
ini_set('error_reporting', E_ALL);

// Función para registrar la creación de una tarea
function registrarNuevaT($tareaName) {
    error_log("Nueva tarea registrada: $tareaName");
}



// Verificar si se recibió una solicitud de creación de tarea
if (isset($_POST['accion']) && $_POST['accion'] == 'crearTarea') {
    $tareaText = $_POST['input'];
    registrarNuevaT($tareaText);
    echo json_encode(array('mensaje' => 'Tarea: '. $tareaText .' creado con éxito.'));
}

?>
