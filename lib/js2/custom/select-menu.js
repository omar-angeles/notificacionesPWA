import {
 INVALID_CLASS, INVALID_EVENT,
 LABEL_NAME, MENU_ID, MENU_SLOT_ID,
 NAME_PROPERTY, OPEN_CLASS,
 POPULATED_CLASS,
 REQUIRED_PROPERTY, SELECTED_CLASS,
 SELECT_MENU_TAG, SUPPORTING_NAME,
 VALUE_PROPERTY
} from "../constantes.js"
import {
 getAttribute
} from "../getAttribute.js"
import {
 setBooleanAttribute
} from "../setBooleanAttribute.js"
import {
 txtObligatorio
} from "../textos/txtObligatorio.js"
import {
 MenuOption
} from "./menu-option.js"

export class SelectMenu
 extends HTMLElement {

 static
  get observedAttributes() {
  return [VALUE_PROPERTY]
 }

 constructor() {
  super()
  /**
   * @private
   * @type {ShadowRoot}
   */
  this._shadow =
   this.attachShadow({
    mode: "open"
   })
  this._shadow.innerHTML =
   /* html */
   `<style>
  :host {
   display: block;
   position:relative;
   margin: 1rem;
  }

  #label {
   display: block;
   cursor: pointer;
  }

  #span::after {
   content: "";
   background-color:
    var(--SurfaceVariant);
   position: absolute;
   z-index: -1;
   top: 0;
   right: 0;
   left: 0;
   bottom: 0;
  }

  #span {
   border-top-left-radius:
    var(
     --ShapeCornerExtraSmall);
   border-top-right-radius:
    var(
     --ShapeCornerExtraSmall);
   position: relative;
   height: 56px;
   box-sizing: border-box;
   display: block;
   cursor: pointer;
   padding: 24px 0 0 0;
   overflow: hidden;
  }

  [${LABEL_NAME}]::slotted(*) {
   color:
    var(--OnSurfaceVariant);
   font-family:
    var(--BodyLargeFont);
   font-size:
    var(--BodyLargeSize);
   font-weight:
    var(--BodyLargeWeight);
   position: absolute;
   top: 24px;
   left: 1rem;
   transition: 0.3s ease-in;
  }

  :host(:focus) [${LABEL_NAME}]::slotted(*),
  :host(.${POPULATED_CLASS}) [${LABEL_NAME}]::slotted(*),
  :host(.float) [${LABEL_NAME}]::slotted(*) {
   transform:
    translateY(-16px);
   font-size:
    var(--BodySmallSize);
  }

  output {
   border-bottom-width: 1px;
   border-bottom-style: solid;
   border-bottom-color:
   var(--OnSurfaceVariant);
   color: var(--OnSurface);
   font-family:
    var(--BodyLargeFont);
   font-size:
    var(--BodyLargeSize);
   font-weight:
    var(--BodyLargeWeight);
   border-top: none;
   border-left: none;
   border-right: none;
   display: block;
   box-sizing: border-box;
   padding: 0 16px 8px 16px;
   background-color:
    transparent;
   resize: none;
   outline: none;
   width: 100%;
   transition: 0.3s ease-in;
   height: 32px;
   line-height: 23px;
   background-position: center;
   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='5' width='32'%3E%3Cpath d='M21 4 16 0 26 0 Z' fill='%2349454E' /%3E%3C/svg%3E");
   background-repeat: no-repeat;
   background-position-x: right;
   background-position-y: 20%;
   padding-right: 32px;
   cursor: pointer;
  }

  :host(.open) output {
   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='5' width='32'%3E%3Cpath d='M21 0 16 4 26 4 Z' fill='%2349454E' /%3E%3C/svg%3E");
  }

  [${SUPPORTING_NAME}]::slotted(*) {
   color:
    var(--OnSurfaceVariant);
   font-family:
    var(--BodySmallFont);
   font-size:
    var(--BodySmallSize);
   font-weight:
    var(--BodySmallWeight);
   padding: 4px 16px 0 16px;
   display: block;
   transition: 0.3s ease-in;
  }

  :host(:focus)  {
   outline: none;
  }

  :host(:focus) [${LABEL_NAME}]::slotted(*)  {
   color: var(--Primary);
  }

  :host(:focus) output {
   border-bottom-width: 2px;
   border-bottom-color:
    var(--Primary);
   padding-bottom: 7px;
   outline: none;
  }

  :host(:hover) #span {
   background-color:
    var(--SurfaceVariantHover);
  }

  :host(:hover) output {
   border-bottom-width: 1px;
   border-bottom-color:
    var(--OnSurface);
    padding-bottom: 8px;
  }

  :host(.${INVALID_CLASS}) output,
  :host(.${INVALID_CLASS}:focus) output {
   border-bottom-color:
    var(--Error);
  }

  :host(.${INVALID_CLASS}) [${LABEL_NAME}]::slotted(*) {
   color: var(--Error);
  }

  :host(.${INVALID_CLASS}) [${SUPPORTING_NAME}]::slotted(*) {
   color: var(--Error);
  }

  :host(.${INVALID_CLASS}:hover) output {
   border-bottom-color:
    var(--OnErrorContainer);
  }

  :host(.${INVALID_CLASS}:hover) [${LABEL_NAME}]::slotted(*) {
   color: var(--OnSurfaceVariant);
  }

  :host(.${INVALID_CLASS}:hover:focus) [${LABEL_NAME}]::slotted(*) {
   color: var(--Error);
  }

  :host(.${INVALID_CLASS}:hover:focus) output {
   border-bottom-width: 2px;
   padding-bottom: 7px;
  }
  
  #${MENU_ID} {
   display: block;
   position: absolute;
   z-index: 1;
   right: 0;
   left: 0;
   top: 57px;
   pointer-events: none;
   transform:
    translateY(-50%) scaleY(0);
   transition: transform 0.5s;
   box-sizing: border-box;
   padding: 4px 0;
   border-bottom-left-radius:
    var(--ShapeCornerMedium);
   border-bottom-right-radius:
    var(--ShapeCornerMedium);
   background-color:
    var(--Elevation);
   cursor: default;
   box-shadow:
    var(--ElevationLevel2);
  }

  :host(.open) #${MENU_ID} {
   pointer-events: all;
   transform:
    translateY(0) scaleY(1);
  }

  #${MENU_SLOT_ID}::slotted(*) {
   display: block;
   border: none;
   background-color:
    transparent;
   color: var(--OnSurface);
   font-family:
    var(--LabelLargeFont);
   font-size:
    var(--LabelLargeSize);
   font-weight:
    var(--LabelLargeWeight);
   box-sizing: border-box;
   padding: 4px 0;
   width: 100%;
   height: 48px;
   line-height: 48px;
   padding: 0 12px;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
   text-align: start;
  }

  #${MENU_SLOT_ID}::slotted(:hover) {
   background-color:
    var(--OnSurfaceHover);
  }

  #${MENU_SLOT_ID}::slotted(:active) {
   background-color:
    var(--Primary);
   background-position: center;
   background-image: radial-gradient(circle, transparent 1%, var(--SurfaceVariant) 1%);
   background-size: 100%;
   animation-fill-mode: forwards;
   animation-name: ripple;
   animation-duration: 0.5s;
  }

  #${MENU_SLOT_ID}::slotted(.selected) {
   color: var(--OnPrimary);
   background-color: var(--Primary);
  }
 </style>
 <span id="label">
  <span id="span">
   <slot ${LABEL_NAME}></slot>
   <output></output>
  </span>
  <slot
   ${SUPPORTING_NAME}></slot>
 </span>
 <div id="${MENU_ID}">
  <slot
   id="${MENU_SLOT_ID}"></slot>
 </div>`
  this._alterna =
   this._alterna.bind(this)
  this._abre =
   this._abre.bind(this)
  this._cierra =
   this._cierra.bind(this)
  /**
   * @readonly
   * @type {{valid:boolean}}
   */
  this.validity = { valid: true }
  /**
   * @private
   * @type {string}
   */
  this._customValidity = ""
  /**
   * @private
   * @type {HTMLSpanElement|
   *        null}
   */
  this._label = this._shadow.
   querySelector("#label")
  /**
   * @private
   * @type {HTMLOutputElement|
   *        null}
   */
  this._target = this._shadow.
   querySelector("output")
  /**
   * @private
   * @type {HTMLElement|null}
   */
  this._menu = this.
   _shadow.querySelector(
    `#${MENU_ID}`
   )
  /**
   * @private
   * @type {HTMLSlotElement|null}
   */
  this._menuSlot = this._shadow.
   querySelector(
    `#${MENU_SLOT_ID}`)
  this.addEventListener(
   "keydown",
   evt => this._onKeyDown(evt))
  if (this._label !== null) {
   this._label.addEventListener(
    "click", this._alterna)
  }
  if (this._menu !== null) {
   this._menu.addEventListener(
    "click",
    evt => this._onClick(evt),
    { capture: true })
  }
  if (this._menuSlot !== null) {
   this._menuSlot.
    addEventListener(
     "slotchange", () =>
     this._cambiaValue())
  }
 }

 connectedCallback() {
  this.tabIndex = 0
 }

 /**
  * @param {string} name
  * @param {string} _oldValue
  * @param {string} _newValue
  */
 attributeChangedCallback(name,
  _oldValue, _newValue) {
  if (name
   === REQUIRED_PROPERTY) {
   this.analiza()
  } else if (name
   === VALUE_PROPERTY
   || name === NAME_PROPERTY) {
   this._cambiaValue()
  }
 }

 get name() {
  return getAttribute(this,
   NAME_PROPERTY)
 }

 set name(name) {
  this.setAttribute(
   VALUE_PROPERTY, name)
 }

 get type() {
  return SELECT_MENU_TAG.
   toUpperCase()
 }

 get required() {
  return this.hasAttribute(
   REQUIRED_PROPERTY)
 }

 set required(required) {
  setBooleanAttribute(this,
   REQUIRED_PROPERTY, required)
 }

 get value() {
  return getAttribute(this,
   VALUE_PROPERTY)
 }

 set value(value) {
  this.setAttribute(
   VALUE_PROPERTY, value)
 }

 get validationMessage() {
  if (this._customValidity
   !== "") {
   return this._customValidity
  } else if (this.required
   && this.value === "") {
   return txtObligatorio()
  } else {
   return ""
  }
 }

 analiza() {
  const t = this._target
  if (t !== null) {
   let value = this.value
   if (value === "") {
    this.classList.
     remove(POPULATED_CLASS)
   } else {
    this.classList.
     add(POPULATED_CLASS)
   }
   if (this.checkValidity()) {
    this.classList.
     remove(INVALID_CLASS)
   } else {
    this.classList.
     add(INVALID_CLASS)
   }
  }
 }

 /** @param {string} error */
 setCustomValidity(error) {
  this._customValidity = error
  this.checkValidity()
 }

 /** @returns {boolean} */
 checkValidity() {
  if (this._customValidity !== ""
   || (this.required
    && this.value === "")) {
   this.validity.valid = false
   this.dispatchEvent(new Event(
    INVALID_EVENT,
    { cancelable: true }
   ))
   return false
  } else {
   this.validity.valid = true
   return true
  }
 }

 /** @private */
 _alterna() {
  if (this.classList.
   contains(OPEN_CLASS)) {
   this._cierra()
  } else {
   this._abre()
  }
 }

 /** @private */
 _abre() {
  this.classList.add(OPEN_CLASS)
  this.addEventListener(
   "focusout", this._cierra,
   { capture: false })
 }

 /** @private */
 _cierra() {
  this.removeEventListener(
   "focusout", this._cierra,
   { capture: false })
  this.classList.
   remove(OPEN_CLASS)
 }

 /** @private */
 _cambiaValue() {
  const value = this.value
  const name = this.name
  for (const o
   of this._opciones) {
   if (name !== "") {
    o.radio.name = name
   }
   if (o.value === value) {
    o.radio.checked = true
    const textContent =
     o.textContent
    const text =
     textContent === null ?
      ""
      : textContent.trim()
    this._text = text
    o.classList.
     add(SELECTED_CLASS)
   } else {
    o.radio.checked = false
    o.classList.
     remove(SELECTED_CLASS)
   }
  }
  this.analiza()
 }
 /**
  * @param {KeyboardEvent
  *        } evt
  */
 _onKeyDown(evt) {
  const key = evt.key
  if (this.classList
   .contains(OPEN_CLASS)) {
   if (key === "Tab") {
    evt.preventDefault()
    this._alterna()
   } else if (key
    === "ArrowDown") {
    evt.preventDefault()
    this._avanzaOpcion()
   } else if (key
    === "ArrowUp") {
    evt.preventDefault()
    this._retrocedeOpcion()
   } else if (key
    === "Escape") {
    evt.preventDefault()
    this._cierra()
   }
  } else if (key !== "Tab") {
   evt.preventDefault()
   this._alterna()
  }
 }
 /**
  * @private
  * @param {Event} evt
  */
 _onClick(evt) {
  const sel = evt.target
  let value = this.value
  for (const o
   of this._opciones) {
   if (o === sel) {
    value = o.value
    break
   }
  }
  this._cierra()
  this.value = value
  this.analiza()
  this.dispatchEvent(
   new Event("input"))
 }

 /**
  * @private
  * @returns {MenuOption[]}
  */
 get _opciones() {
  /** @type {MenuOption[]} */
  const arr = []
  const m = this._menuSlot
  if (m !== null) {
   const elements =
    m.assignedElements()
   for (const o of elements) {
    if (o
     instanceof MenuOption) {
     arr.push(o)
    }
   }
  }
  return arr
 }

 /**
  * @private
  * @returns {string}
  */
 get _text() {
  const t = this._target
  return t === null ?
   ""
   : t.value
 }

 /**
  * @private
  * @param {string} text
  */
 set _text(text) {
  const t = this._target
  if (t !== null) {
   t.value = text
  }
 }

 /** @private */
 _avanzaOpcion() {
  const i = this._valueIndex
  const opciones = this._opciones
  if (i < opciones.length - 1) {
   this.value =
    opciones[i + 1].value
  }
 }

 /** @private */
 _retrocedeOpcion() {
  const i = this._valueIndex
  const opciones = this._opciones
  if (i > 0) {
   this.value =
    opciones[i - 1].value
  }
 }

 /**
  * @private
  * @returns {number}
  */
 get _valueIndex() {
  const value = this.value
  return this._opciones.
   findIndex(
    o => o
     instanceof MenuOption &&
     o.value === value)
 }
}

customElements.define(
 SELECT_MENU_TAG, SelectMenu)