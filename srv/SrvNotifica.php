<?php
require __DIR__ .
 "/../vendor/autoload.php";
require_once __DIR__ .
 "/modelo/Suscripcion.php";
require_once __DIR__ .
 "/dao/suscripcionConsulta.php";
require_once __DIR__ .
 "/dao/suscripcionElimina.php";
require_once __DIR__ .
 "/../lib/php/Servicio.php";

use Minishlink\WebPush\WebPush;

class SrvNotifica extends Servicio
{
 protected
 function implementacion()
 {
  $suscripciones =
   suscripcionConsulta();

  $auth = [
   "VAPID" => [
    "subject" =>
    "https://phppush--gilbertopacheco.repl.co/",
    "publicKey" =>
    // "BLwPg7Xtz3B6Gi05JcxkBtQ4a6Hldnb334J9CuFGi4UojkwWxnRy8W4eIZ37pQIPpY5PORWP99LoBg37bnI7bb8",
    "BNIJ9atmfAi9C9hJgfZA7lD3FxMca0voBnHhcygmVP6pVoOpjtH-04m-H2OLNM8daKTTViLx3BD93UScmp1tv3M",
    "privateKey" =>
    "M_hcQKWK7l4nNlcHSGfzQ8mA-n_UYhoGQBJLrMGLS8Y"
    // "o1MG-1IgZ4npzHKQLd6LIJeFVhV6MQdIlPjAolxnAHY"
   ]
  ];

  $webPush = new WebPush($auth);

  foreach ($suscripciones
   as $suscripcion) {
   $webPush->queueNotification(
    $suscripcion,
    "Hola equipos Dev's System y TecnoTeam! 👋"
   );
  }
  $reportes = $webPush->flush();
  $resultados = [];
  foreach ($reportes as $reporte) {
   $endpoint = $reporte
    ->getRequest()->getUri()
    ->__toString();
   if ($reporte->isSuccess()) {
    $resultados[] = [
     "endpoint" => $endpoint,
     "resultado" => "Éxito"
    ];
   } else {
    if ($reporte
     ->isSubscriptionExpired()
    ) {
     suscripcionElimina($endpoint);
    }
    $resultados[] = [
     "endpoint" => $endpoint,
     "resultado" => "Fallo",
     "explicacion" =>
     $reporte->getReason()
    ];
   }
  }
  return $resultados;
 }
}
$servicio = new SrvNotifica();
$servicio->ejecuta();
