/**
 * Sin un elemento tiene un
 * mensaje de validación, lo
 * muestra en su elemento de
 * ayuda y si no, muestra un
 * texto de ayuda. 
 * @param {{
 *       validity:{valid:boolean};
 *       validationMessage: string
 *      }|
 *      null} e
 * referencia a un elemento que
 * contiene datos.
 * @param {HTMLElement|null} out
 * elemento de ayuda para e.
 * @param {string} ok mensaje de
 * ayuda cuando el estado de e es
 * válido.
 */
export function msg(e, out, ok) {
 if (e !== null
  && out !== null) {
  if (e.validity.valid) {
   out.textContent = ok
  } else {
   out.textContent =
    e.validationMessage
  }
 }
}