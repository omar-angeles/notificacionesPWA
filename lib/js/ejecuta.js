/**
 * Espera a que la promesa de un
 * fetch termine. Si hay error
 * lanza una excepción. Si no hay
 * error, interpreta la respuesta
 * del servidor como JSON y
 * la convierte en una literal de
 * objeto. 
 * @param {Promise<Response>} fetch
 * @returns {Promise<any>}
 */
export
 async function ejecuta(fetch) {
 const resp = await fetch
 if (resp.ok) {
  return await resp.json()
 } else if (
  resp.status === 500) {
  throw new Error(
   await resp.text())
 } else {
  throw new Error(resp.statusText)
 }
}