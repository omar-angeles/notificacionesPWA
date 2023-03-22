import {
 ejecuta
} from "./ejecuta.js"
import {
 Method
} from "./Method.js"

/**
 * Envía los datos de la forma a la
 * url con el método POST usando la
 * función ejecuta. 
 * @param {Event} evt
 * @param {string} url
 * @param {HTMLFormElement} forma
 * @returns {Promise<any>}
 */
export async function
 submit(evt, url, forma) {
 evt.preventDefault()
 return await ejecuta(
  fetch(url, {
   method: Method.POST,
   body: new FormData(forma)
  }))
}