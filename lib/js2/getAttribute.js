/**
 * @param {HTMLElement} element
 * @param {string} name
 * @returns {string}
 */
export function getAttribute(
 element, name) {
 const value =
  element.getAttribute(name)
 return value === null ?
  ""
  : value
}