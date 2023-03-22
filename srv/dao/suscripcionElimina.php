<?php
require_once __DIR__ .
 "/../modelo/Suscripcion.php";
require_once __DIR__ .
 "/AccesoBd.php";

function suscripcionElimina(
 string $endpoint
) {
 $con = AccesoBd::getCon();
 $stmt = $con->prepare(
  "DELETE FROM SUSCRIPCION
   WHERE
   SUS_ENDPOINT = :endpoint"
 );
 $stmt->execute(
  [":endpoint" => $endpoint]);
}
