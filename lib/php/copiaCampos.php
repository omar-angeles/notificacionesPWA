<?php
function copiaCampos($dest, $orig)
{
 foreach ($orig as $key => $val) {
  $dest->{$key} = $val;
 }
}
