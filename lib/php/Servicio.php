<?php
abstract class Servicio
{
 abstract protected
 function implementacion();
 public function ejecuta()
 {
  mb_internal_encoding("UTF-8");
  try {
   $resultado =
    $this->implementacion();
   echo json_encode($resultado);
  } catch (\Throwable $t) {
   http_response_code(500);
   echo $t->getMessage();
  }
 }
}
