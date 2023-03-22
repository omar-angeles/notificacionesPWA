import {
 muestraError
} from "./muestraError.js"

/** @param {string | URL} sw */
export async function regSw(sw) {
 try {
  /* Registra el service worker,
   * que debe estar en la carpeta
   * principal. */
  if ("serviceWorker"
   in navigator) {
   const registro =
    await navigator.
     serviceWorker.
     register(sw)
   console.log(sw, "registrado.")
   console.log(registro)
  }
 } catch (e) {
  muestraError(e)
 }
}