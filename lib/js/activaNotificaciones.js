import {
 txtNoNots
} from "./textos/txtNoNots.js"
import {
 txtNotsBloqs
} from "./textos/txtNotsBloqs.js"

export async function
 activaNotificaciones() {
 if ("Notification" in window) {
  let permiso =
   Notification.permission
  if (permiso === "default") {
   permiso = await Notification.
    requestPermission()
  }
  if (permiso === "denied") {
   throw new Error(txtNotsBloqs())
  }
 } else {
  throw new Error(txtNoNots())
 }
}