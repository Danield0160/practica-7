<?php
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");

$miObjeto = new stdClass();
$miObjeto->nombre = "Danielcasaphp";
$miObjeto->apellidos = "Rosales Martin";
$miObjeto->dni = "78588395V";
$miObjeto->nacimiento = "05/03/2001";
$miObjeto->postal = "35509";
$miObjeto->email = "daniel.rosles@gmail.om";
$miObjeto->fijo = "987654321";
$miObjeto->movil = "654321987";
$miObjeto->iban = "ES1234567891234567891234";
$miObjeto->credito = "123456789123";
$miObjeto->password = "123456789321d_";
$miObjeto->password_repeat = "123456789321d_";


echo json_encode($miObjeto)

?>