import {
 ejecuta
} from "./ejecuta.js"
import {
 Method
} from "./Method.js"

/**
* @param {Object} datos
* @param {Method} metodo
* @param {string} url
*/
export async function
 enviaJson(datos, metodo, url) {
 return await ejecuta(fetch(url, {
  method: metodo,
  body: JSON.stringify(datos)
 }))
}