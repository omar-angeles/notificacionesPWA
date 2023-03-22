/**
 * @param {HTMLElement} element
 * @param {string} name
 * @param {boolean} value
 */
export
 function setBooleanAttribute(
  element, name, value) {
 if (value) {
  element.setAttribute(name, name)
 } else {
  element.removeAttribute(name)
 }
}