import {
 VALUE_PROPERTY
} from "../constantes.js"
import {
 getAttribute
} from "../getAttribute.js"

export class MenuOption
 extends HTMLElement {

 static
  get observedAttributes() {
  return [VALUE_PROPERTY]
 }

 constructor() {
  super()
  /**
   * @private
   * @type {HTMLInputElement|
   *        null}
   */
  this._radio = null
 }

 /**
  * @param {string} name
  * @param {string} _oldValue
  * @param {string} newValue
  */
 attributeChangedCallback(name,
  _oldValue, newValue) {
  if (name === VALUE_PROPERTY) {
   this.radio.value = newValue
  }
 }

 get radio() {
  if (this._radio === null) {
   this._radio = this.
    appendChild(document.
     createElement("input"))
   this._radio.type = "radio"
   this.radio.style.appearance =
    "none"
   this.radio.style.transform =
    "scaleY(0)"
  }
  return this._radio
 }

 get value() {
  return getAttribute(this,
   VALUE_PROPERTY)
 }

 /** @param {string} value */
 setValue(value) {
  this.setAttribute(
   VALUE_PROPERTY, value)
 }
}
customElements.define(
 "menu-option", MenuOption)