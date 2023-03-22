<?php
require_once __DIR__ .
 "/../modelo/Suscripcion.php";
require_once __DIR__ .
 "/AccesoBd.php";

function suscripcionConsulta()
{
 $con = AccesoBd::getCon();
 $stmt = $con->query(
  "SELECT
    SUS_ENDPOINT as endpoint,
    SUS_PUB_KEY as publicKey,
    SUS_AUT_TOK as authToken,
    SUS_CONT_ENCOD as
      contentEncoding
   FROM SUSCRIPCION"
 );
 return $stmt->fetchAll(
  PDO::FETCH_CLASS,
  "Suscripcion"
 );
}
