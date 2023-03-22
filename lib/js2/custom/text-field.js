import {
 LABEL_NAME, POPULATED_CLASS,
 TARGET_NAME, SUPPORTING_NAME,
 INVALID_CLASS, VALUE_PROPERTY,
 GET_VALUE_PROPERTY,
 CHECK_VALIDITY_PROPERTY
} from "../constantes.js"

export class TextField
 extends HTMLElement {

 constructor() {
  super()
  /**
   * @private
   * @type {ShadowRoot}
   */
  this._shadow =
   this.attachShadow({
    mode: "open",
    delegatesFocus: true
   })
  this._shadow.innerHTML =
   /* html */
   `<style>
   :host {
    display: block;
    margin: 1rem;
   }

   label {
    display: block;
   }

   span::after {
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

   span {
    border-top-left-radius:
     var(--ShapeCornerExtraSmall);
    border-top-right-radius:
     var(--ShapeCornerExtraSmall);
     position: relative;
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

   :host(:focus-within) [${LABEL_NAME}]::slotted(*),
   :host(.${POPULATED_CLASS}) [${LABEL_NAME}]::slotted(*),
   :host(.float) [${LABEL_NAME}]::slotted(*) {
    transform:
     translateY(-16px);
    font-size:
     var(--BodySmallSize);
   }

   [${TARGET_NAME}]::slotted(*) {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color:
    var(--OnSurfaceVariant);
    caret-color:
     var(--Primary);
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
   }

   [${TARGET_NAME}]::slotted(input) {
    height: 32px;
    line-height: 23px;
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

   :host(:focus-within) [${LABEL_NAME}]::slotted(*)  {
    color: var(--Primary);
   }

   [${TARGET_NAME}]::slotted(:focus) {
    border-bottom-width: 2px;
    border-bottom-color:
     var(--Primary);
    padding-bottom: 7px;
    outline: none;
   }

   :host(:hover) span {
    background-color:
     var(--SurfaceVariantHover);
   }

   :host(:hover) [${TARGET_NAME}]::slotted(*) {
    border-bottom-width: 1px;
    border-bottom-color:
     var(--OnSurface);
     padding-bottom: 8px;
   }

   [${TARGET_NAME}]::slotted(:invalid),
   [${TARGET_NAME}]::slotted(:focus:invalid) {
    border-bottom-color:
     var(--Error);
   }

   :host(.${INVALID_CLASS}) [${LABEL_NAME}]::slotted(*) {
    color: var(--Error);
   }

   :host(.${INVALID_CLASS}) [${SUPPORTING_NAME}]::slotted(*) {
    color: var(--Error);
   }

   [${TARGET_NAME}]::slotted(:focus:invalid) {
    caret-color: var(--Error);
   }

   :host(:hover) [${TARGET_NAME}]::slotted(:invalid) {
    border-bottom-color:
     var(--OnErrorContainer);
   }

   :host(.${INVALID_CLASS}:hover) [${LABEL_NAME}]::slotted(*) {
    color: var(--OnSurfaceVariant);
   }

   :host(.${INVALID_CLASS}:hover:focus-within) [${LABEL_NAME}]::slotted(*) {
    color: var(--Error);
   }

   :host(.${INVALID_CLASS}:hover) [${TARGET_NAME}]::slotted(*:focus) {
    border-bottom-width: 2px;
    padding-bottom: 7px;
   }
  </style>
  <label>
   <span>
    <slot ${LABEL_NAME}></slot>
    <slot ${TARGET_NAME}></slot>
   </span>
   <slot
    ${SUPPORTING_NAME}></slot>
  </label>`
  this.analiza =
   this.analiza.bind(this)
  /**
   * @private
   * @type {HTMLSlotElement|null}
   */
  this._target = this._shadow.
   querySelector(
    `[${TARGET_NAME}]`)
  /**
   * @private
   * @type {Element|null}
   */
  this._targetElement = null
  if (this._target !== null) {
   this._target.addEventListener(
    "slotchange",
    () => this._configTarget())
  }
 }

 /** @private */
 _configTarget() {
  if (this._targetElement
   !== null) {
   this._targetElement.
    removeEventListener("input",
     this.analiza)
   this._targetElement = null
  }
  if (this._target !== null) {
   for (const t of this._target
    .assignedElements()) {
    this._targetElement = t
    t.addEventListener("input",
     this.analiza)
    this.analiza()
   }
  }
 }

 analiza() {
  const t = this._targetElement
  if (t !== null) {
   let value = this._getValue()
   if (value === "") {
    this.classList.
     remove(POPULATED_CLASS)
   } else {
    this.classList.
     add(POPULATED_CLASS)
   }
   if (this._checkValidity()) {
    this.classList.
     remove(INVALID_CLASS)
   } else {
    this.classList.
     add(INVALID_CLASS)
   }
  }
 }

 /**
  * @private
  * @returns {string}
  */
 _getValue() {
  let value = ""
  const t = this._targetElement
  if (t !== null) {
   if (VALUE_PROPERTY in t) {
    value = t[VALUE_PROPERTY]
   } else if (
    typeof t[GET_VALUE_PROPERTY]
    === "function") {
    value =
     t[GET_VALUE_PROPERTY]()
   }
  }
  return value === null ||
   value === undefined ? ""
   : value
 }

 /**
  * @private
  * @returns {boolean}
  */
 _checkValidity() {
  const t = this._targetElement
  if (t !== null) {
   if (typeof t[CHECK_VALIDITY_PROPERTY]
    === "function") {
    return t[CHECK_VALIDITY_PROPERTY]()
   }
  }
  return true
 }
}
customElements.
 define("text-field", TextField)