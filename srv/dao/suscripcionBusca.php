<?php
require_once __DIR__ .
 "/../modelo/Suscripcion.php";
require_once __DIR__ .
 "/AccesoBd.php";

function suscripcionBusca(
 string $endpoint
) {
 $con = AccesoBd::getCon();
 $stmt = $con->prepare(
  "SELECT
    SUS_ENDPOINT as endpoint,
    SUS_PUB_KEY as publicKey,
    SUS_AUT_TOK as authToken,
    SUS_CONT_ENCOD as
      contentEncoding
   FROM SUSCRIPCION
   WHERE SUS_ENDPOINT = :endpoint"
 );
 $stmt->execute(
  [":endpoint" => $endpoint]
 );
 $stmt->setFetchMode(
  PDO::FETCH_CLASS,
  "Suscripcion"
 );
 return $stmt->fetch();
}
