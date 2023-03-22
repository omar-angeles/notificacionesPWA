<?php
require __DIR__ .
 "/../vendor/autoload.php";

use Minishlink\WebPush\VAPID;

var_dump(VAPID::createVapidKeys());