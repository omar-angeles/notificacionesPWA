import {
 ES_APPLE, ICON_NAME, MENU_ID,
 OPEN_CLASS
} from "../constantes.js"

export class OverflowMenu
 extends HTMLElement {
 constructor() {
  super()
  /**
   * @private
   * @type {ShadowRoot}
   */
  this._shadow = this.
   attachShadow({ mode: "open" })
  this._shadow.innerHTML =
   /* html */
   `<style>
   :host {
    position: relative;
   }

   div {
    position: absolute;
    z-index: 3;
    min-width: 112px;
    max-width: 280px;
    top: 3rem;
    right: 1rem;
    display: block;
    pointer-events: none;
    transform:
     translateY(-50%) scaleY(0);
    transition: transform 0.5s;
    box-sizing: border-box;
    padding: 4px 0;
    border-radius:
     var(--ShapeCornerMedium);
    background-color:
     var(--Elevation);
    cursor: default;
    box-shadow:
     var(--ElevationLevel2);
   }

   :host(.${OPEN_CLASS}) div {
    pointer-events: all;
    transform:
     translateY(0) scaleY(1);
   }

   #${MENU_ID}::slotted(*) {
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
    width: 100%;
    height: 48px;
    line-height: 48px;
    padding: 0 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: start;
   }

   #${MENU_ID}::slotted(:hover) {
    background-color:
     var(--OnSurfaceHover);
   }

   #${MENU_ID}::slotted(:focus) {
    background-color:
     var(--OnSurfaceFocus);
   }

   #${MENU_ID}::slotted(:active) {
    background-color:
     var(--Primary);
    background-position: center;
    background-image: radial-gradient(circle, transparent 1%, var(--SurfaceVariant) 1%);
    background-size: 100%;
    animation-fill-mode:
     forwards;
    animation-name: rippleMenu;
    animation-duration: 0.5s;
   }
  </style>
  <slot ${ICON_NAME}></slot>
  <div>
   <slot id="${MENU_ID}"></slot>
  </div>`
  this._alterna =
   this._alterna.bind(this)
  this._clickCierra =
   this._clickCierra.bind(this)
  /**
   * @private
   * @type {HTMLSlotElement|
   *        null}
   */
  this._icon = this._shadow.
   querySelector(
    `[${ICON_NAME}]`)
  /**
   * @private
   * @type {HTMLSlotElement|
   *        null}
   */
  this._menu = this._shadow.
   querySelector(`[${MENU_ID}]`)
  /**
   * @private
   * @type {Element|null}
   */
  this._iconElement = null
  if (this._icon !== null) {
   this._icon.addEventListener(
    "slotchange",
    () => this._iconConfig())
  }
  if (this._menu !== null) {
   this._menu.
    addEventListener(
     "slotchange", () =>
     this._menuConfig())
  }
 }

 /** @private */
 _iconConfig() {
  if (this._iconElement
   !== null) {
   this._iconElement.
    removeEventListener(
     "click", this._alterna)
   this._iconElement = null
  }
  if (this._icon !== null) {
   for (const e of this._icon
    .assignedElements()) {
    this._iconElement = e
    e.addEventListener("click",
     this._alterna)
    e.innerHTML =
     ES_APPLE ? /* html */
      `<span style="color:
        var(--OnSurfaceVariant)"
        class="material-symbols-outlined">
        more_horiz
      </span>`
      : /* html */
      `<span style="color:
        var(--OnSurfaceVariant)"
        class="material-symbols-outlined">
        more_vert
      </span>`
   }
  }
 }

 /** @private */
 _menuConfig() {
  if (this._menu !== null) {
   for (const e of this._menu
    .assignedElements()) {
    const span =
     e.querySelector("span")
    if (span !== null) {
     span.style.verticalAlign =
      "middle";
     span.style.marginRight =
      "12px";
    }
   }
  }
 }

 /** @private */
 _alterna() {
  const list = this.classList
  list.toggle(OPEN_CLASS)
  if (list
   .contains(OPEN_CLASS)) {
   document.addEventListener(
    "click", this._clickCierra)
  } else {
   document.removeEventListener(
    "click", this._clickCierra)
  }
 }

 /**
  * @private
  * @param {Event} evt
  */
 _clickCierra(evt) {
  const target = evt.target
  if (this.classList
   .contains(OPEN_CLASS)
   && this._iconElement
   !== null
   && target
   instanceof HTMLElement
   && !this._iconElement.
    contains(target)) {
   this.classList
    .remove(OPEN_CLASS)
   document.removeEventListener(
    "click", this._clickCierra)
  }
 }
}

customElements.define(
 "overflow-menu", OverflowMenu)