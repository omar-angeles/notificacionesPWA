import {
 SELECTED_CLASS
} from "../lib/js2/constantes.js"

export class MiNav
 extends HTMLElement {
 connectedCallback() {
  this.classList.add("navTab")
  this.innerHTML = /* html */
   `<a href="index.html">
     <span class="material-symbols-outlined">
      home
     </span>
     Recomiendo
    </a>
    <a href="ayuda.html">
     <span class="material-symbols-outlined">
      help
     </span>
     Ayuda
    </a>`
  const href = location.href
  const index = this.querySelector(
   "[href='index.html']")
  const ayuda = this.querySelector(
   "[href='ayuda.html']")
  if (ayuda != null &&
   href.endsWith("ayuda.html")) {
   ayuda.classList.
    add(SELECTED_CLASS)
  } else if (index != null) {
   index.classList.
    add(SELECTED_CLASS)
  }
 }
}
customElements.define(
 "mi-nav", MiNav)