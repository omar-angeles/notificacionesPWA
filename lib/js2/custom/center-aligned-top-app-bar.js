import {
 AVATAR_NAME, ELEVATION_CLASS,
 HEADLINE_NAME, NAVIGATION_NAME
} from "../constantes.js"

export class CenterAlignedTopAppBar
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
    z-index: 2;
    position: sticky;
    top: 0;
    display: block;
    color: var(--OnSurface);
    background-color:
     var(--Surface)
   }

   :host(.${ELEVATION_CLASS}) {
    background-color:
     var(--Elevation);
   }

   [${HEADLINE_NAME}]::slotted(*) {
    margin: 0 70px;
    line-height: 64px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family:
     var(--TitleLargeFont);
    font-size:
     var(--TitleLargeSize);
    font-weight:
     var(--TitleLargeWeight);
   }

   [${NAVIGATION_NAME}]::slotted(*) {
    position: absolute;
    top: 8px;
    left: 4px
   }

   [${AVATAR_NAME}]::slotted(*) {
    position: absolute;
    top: 8px;
    right: 7px
   }
  </style>
  <slot ${HEADLINE_NAME}></slot>
  <slot ${NAVIGATION_NAME}></slot>
  <slot ${AVATAR_NAME}></slot>
  <slot name="adicional"></slot>`
  /**
   * @private
   * @type {number}
   */
  this._posY = 0
  /**
   * @private
   * @type {boolean}
   */
  this._scrolling = false
  /**
   * @private
   * @type {HTMLSlotElement|
   *        null}
   */
  this._avatar = this._shadow.
   querySelector(
    `[${AVATAR_NAME}]`)
  if (this._avatar !== null) {
   this._avatar.addEventListener(
    "slotchange",
    () => this._avatarConfig())
  }
  addEventListener("scroll",
   () => this._onScroll())
 }

 /** @private */
 _avatarConfig() {
  if (this._avatar !== null) {
   for (const e of this._avatar
    .assignedElements()) {
    const span =
     e.querySelector("span")
    if (span !== null) {
     span.style.color =
      "var(--OnSurfaceVariant)"
     span.style.padding = "5px"
     span.style.fontSize = "30px"
    }
   }
  }
 }

 /** @private */
 _onScroll() {
  this._posY = scrollY
  if (!this._scrolling) {
   requestAnimationFrame(
    () => this._avanza())
  }
  this._scrolling = true
 }

 /** @private */
 _avanza() {
  if (this._posY === 0) {
   this.classList.
    remove(ELEVATION_CLASS)
  } else {
   this.classList.
    add(ELEVATION_CLASS)
  }
  this._scrolling = false
 }
}
customElements.define(
 "center-aligned-top-app-bar",
 CenterAlignedTopAppBar)