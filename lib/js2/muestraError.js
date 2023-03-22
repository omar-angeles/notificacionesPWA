/**
 * Muestra un error en la consola y
 * un cuadro de alerta con el
 * mensaje.
 * @param {Error} e descripción
 *  del error.
 */
export function muestraError(e) {
 console.error(e)
 alert(e.message)
}