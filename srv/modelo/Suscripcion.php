<?php

use Minishlink\WebPush\SubscriptionInterface;

class Suscripcion
implements SubscriptionInterface
{
 public $endpoint;
 public $publicKey;
 public $authToken;
 public $contentEncoding;

 /**
  * @return string
  */
 public function
 getEndpoint(): string
 {
  return $this->endpoint;
 }

 /**
  * @return null|string
  */
 public function
 getPublicKey(): ?string
 {
  return $this->publicKey;
 }

 /**
  * @return null|string
  */
 public function
 getAuthToken(): ?string
 {
  return $this->authToken;
 }

 /**
  * @return null|string
  */
 public function
 getContentEncoding(): ?string
 {
  return $this->contentEncoding;
 }
}
