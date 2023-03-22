<?php
require_once __DIR__ .
 "/bdCrea.php";

class AccesoBd
{
 private static $con = null;

 public static
 function getCon(): \PDO
 {
  if (self::$con === null) {
   self::$con = self::conecta();
   self::prepara();
  }
  return self::$con;
 }
 public static
 function conecta(): \PDO
 {
  return new PDO(
   "sqlite:phppush.db",
   null,
   null,
   [PDO::ATTR_ERRMODE =>
   PDO::ERRMODE_EXCEPTION]
  );
 }
 public static function prepara()
 {
  bdCrea(self::getCon());
 }
}
