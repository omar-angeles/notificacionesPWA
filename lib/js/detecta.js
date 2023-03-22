import {
 activaNotificaciones
} from "./activaNotificaciones.js"
import {
 txtNoNots
} from "./textos/txtNoNots.js"
import {
 txtNoPush
} from "./textos/txtNoPush.js"
import {
 txtNoSw
} from "./textos/txtNoSw.js"
import {
 txtRegistrado
} from "./textos/txtRegistrado.js"

/** @param {string | URL} sw */
export async function detecta(sw) {
 activaNotificaciones()
 if (!('PushManager' in window)) {
  throw new Error(txtNoPush())
 } else if ("serviceWorker"
  in navigator) {
  const registro = await navigator.
   serviceWorker.
   register(sw)
  console.log(sw, txtRegistrado())
  console.log(registro)
  if (!("showNotification"
   in registro)) {
   throw new Error(txtNoNots())
  }
 } else {
  throw new Error(txtNoSw())
 }
}