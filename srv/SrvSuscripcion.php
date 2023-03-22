<?php
require __DIR__ .
 "/../vendor/autoload.php";
require_once __DIR__ .
 "/modelo/Suscripcion.php";
require_once __DIR__ .
 "/dao/suscripcionAgrega.php";
require_once __DIR__ .
 "/dao/suscripcionBusca.php";
require_once __DIR__ .
 "/dao/suscripcionModifica.php";
require_once __DIR__ .
 "/dao/suscripcionElimina.php";
require_once __DIR__ .
 "/../lib/php/Servicio.php";
require_once __DIR__ .
 "/../lib/php/leeJson.php";
require_once __DIR__ .
 "/../lib/php/copiaCampos.php";

function leeSuscripcion()
{
 $json = leeJson();
 $modelo = new Suscripcion();
 copiaCampos($modelo, $json);
 return $modelo;
}

class SrvSuscripcion
extends Servicio
{
 protected
 function implementacion()
 {
  $modelo = leeSuscripcion();
  $method =
   $_SERVER["REQUEST_METHOD"];

  if ($method === "POST") {
   suscripcionAgrega($modelo);
  } elseif ($method === "PUT") {
   $registrado = suscripcionBusca(
    $modelo->endpoint
   );
   if ($registrado) {
    suscripcionModifica($modelo);
   } else {
    suscripcionAgrega($modelo);
   }
  } elseif ($method === "DELETE") {
   suscripcionElimina(
    $modelo->endpoint
   );
  }
  return [];
 }
}
$servicio = new SrvSuscripcion();
$servicio->ejecuta();
