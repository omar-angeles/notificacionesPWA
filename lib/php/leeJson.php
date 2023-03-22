<?php
function leeJson()
{
 return json_decode(
  file_get_contents(
   "php://input"
  )
 );
}
