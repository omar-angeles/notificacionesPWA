/**
* @param {PushSubscription
*        } suscripcion
*/
export function
 getSuscripcionDto(suscripcion) {
 const key =
  suscripcion.getKey("p256dh")
 const token =
  suscripcion.getKey("auth")
 const supported = PushManager
  .supportedContentEncodings
 const encodings =
  Array.isArray(supported) &&
   supported.length > 0 ?
   supported
   : ["aesgcm"]
 const endpoint =
  suscripcion.endpoint
 const publicKey = key === null ?
  null
  : btoa(String.fromCharCode.apply(
   null, new Uint8Array(key)))
 const authToken = token === null ?
  null
  : btoa(String.fromCharCode.apply(
   null, new Uint8Array(token)))
 const contentEncoding =
  encodings[0]
 return {
  endpoint,
  publicKey,
  authToken,
  contentEncoding
 }
}
