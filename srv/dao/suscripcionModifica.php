<?php
require_once __DIR__ .
 "/../modelo/Suscripcion.php";
require_once __DIR__ .
 "/AccesoBd.php";

function suscripcionModifica(
 Suscripcion $modelo
) {
 $con = AccesoBd::getCon();
 $stmt = $con->prepare(
  "UPDATE SUSCRIPCION
    SET SUS_PUB_KEY = :publicKey,
        SUS_AUT_TOK = :authToken,
        SUS_CONT_ENCOD =
      :contentEncoding
   WHERE
   SUS_ENDPOINT = :endpoint"
 );
 $stmt->execute([
  ":endpoint" => $modelo->endpoint,
  ":publicKey" =>
  $modelo->publicKey,
  ":authToken" =>
  $modelo->authToken,
  ":contentEncoding" =>
  $modelo->contentEncoding
 ]);
}
