import {
 ACTION_NAME, CLASS_CENTRADO,
 CLASS_JUSTIFICADO,
 ELEVATION_CLASS, ES_APPLE,
 HEADLINE_NAME,
 HEADLINE_SMALL_NAME, MEDIUM_CLASS,
 NAVIGATION_NAME, OVERFLOW_NAME
} from "../constantes.js"

class TopAppBar
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

#base {
 display: flex;
 align-items: center;
 height: 64px;
 box-sizing: border-box;
 padding-left: 4px;
 padding-right: 4px;
}

#navigation {
 min-height: 24px;
 min-width: 12px;
}

[${HEADLINE_NAME}]::slotted(*) {
 height: 64px;
 line-height: 64px;
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

:host(.${MEDIUM_CLASS}) #base {
 height: 48px;
 transition: 0.5s;
}

:host(.${MEDIUM_CLASS}) [${HEADLINE_NAME}]::slotted(*) {
 height: 24px;
 pointer-events: none;
 transform:
  translateY(50%) scaleY(0);
 transition: 0.5s;
}

:host(.${MEDIUM_CLASS}.${ELEVATION_CLASS}) #base {
 height: 64px;
}

:host(.${MEDIUM_CLASS}.${ELEVATION_CLASS}) [${HEADLINE_NAME}]::slotted(*) {
 height: 64px;
 pointer-events: all;
 transform:
  translateY(0) scaleY(1);
}

[${HEADLINE_SMALL_NAME}]::slotted(*) {
 box-sizing: border-box;
 margin: 0;
 padding: 0 16px 16px 16px;
 font-family:
  var(--TitleLargeFont);
 font-size:
  var(--TitleLargeSize);
 font-weight:
  var(--TitleLargeWeight);
 transform: scaleY(1);
 transition: 0.5s;
}

:host(.${ELEVATION_CLASS}) [${HEADLINE_SMALL_NAME}]::slotted(*) {
 height: 0;
 padding: 0;
 pointer-events: none;
 transform: scaleY(0);
}

:host(.${CLASS_CENTRADO}) [${HEADLINE_NAME}]::slotted(*) {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 margin: 0 70px;
 text-align: center;
}

:host(.${CLASS_JUSTIFICADO}) [${HEADLINE_NAME}]::slotted(*) {
 flex: 1 0;
 margin: 0;
 padding-left: 4px;
 padding-right: 12px;
}

[${OVERFLOW_NAME}]::slotted(*) {
 margin-left: auto;
}
</style>
<div id="base">
<div id="navigation">
 <slot
   ${NAVIGATION_NAME}></slot>
</div>
<slot ${HEADLINE_NAME}></slot>
<slot ${ACTION_NAME}></slot>
<slot ${OVERFLOW_NAME}></slot>
</div>
<slot ${HEADLINE_SMALL_NAME}>
</slot>
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
  this._headlineSmall = this.
   _shadow.querySelector(
    `[${HEADLINE_SMALL_NAME}]`)
  /**
   * @private
   * @type {HTMLSlotElement|
   *        null}
   */
  this._action = this._shadow.
   querySelector(
    `[${ACTION_NAME}]`)
  if (this._action !== null) {
   this._action.
    addEventListener(
     "slotchange", () =>
     this._configAction())
  }
  if (this._headlineSmall
   !== null) {
   this._headlineSmall.
    addEventListener(
     "slotchange", () =>
     this._configHeadlineSmall())
  }
  addEventListener("scroll",
   () => this._onScroll())
 }

 connectedCallback() {
  this._configHeadlineSmall()
  this._configAction()
 }

 /** @private */
 _configHeadlineSmall() {
  if (this._headlineSmall
   !== null) {
   const elements = this.
    _headlineSmall.
    assignedElements()
   if (this.isConnected) {
    if (elements.length === 0) {
     this.classList.
      remove(MEDIUM_CLASS)
    } else {
     this.classList.
      add(MEDIUM_CLASS)
    }
   }
  }
 }

 /** @private */
 _configAction() {
  if (this._action !== null) {
   const elements = this.
    _action.assignedElements()
   if (this.isConnected) {
    if (ES_APPLE
     && elements.length === 0) {
     this.isConnected
     this.classList.
      add(CLASS_CENTRADO)
     this.classList.
      remove(CLASS_JUSTIFICADO)
    } else {
     this.classList.
      add(CLASS_JUSTIFICADO)
     this.classList.
      remove(CLASS_CENTRADO)
    }
   }
   for (const e of elements) {
    const span =
     e.querySelector("span")
    if (span !== null) {
     span.style.color =
      "var(--OnSurfaceVariant)"
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

customElements.
 define("top-app-bar", TopAppBar)