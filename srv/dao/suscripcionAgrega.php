<?php
require_once __DIR__ .
 "/../modelo/Suscripcion.php";
require_once __DIR__ .
 "/AccesoBd.php";

function suscripcionAgrega(
 Suscripcion $modelo
) {
 $con = AccesoBd::getCon();
 $stmt = $con->prepare(
  "INSERT INTO SUSCRIPCION
    (SUS_ENDPOINT, SUS_PUB_KEY,
    SUS_AUT_TOK, SUS_CONT_ENCOD)
   VALUES
    (:endpoint, :publicKey,
     :authToken, :contentEncoding)"
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
