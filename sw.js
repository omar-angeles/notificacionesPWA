/* Este archivo debe estar
 * colocado en la carpeta raíz del
 * sitio.
 * 
 * Cualquier cambio en el
 * contenido de este archivo hace
 * que el service worker se
 * reinstale.
 * 
 * Normalmente se cambia el número
 * de la versión cuando cambia el
 * contenido de los archivos. */
const VERSION = "1.4"

/** Nombre del archivo de cache. */
const CACHE = "Rcm"

/**
 * Archivos requeridos para que la
 * aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
 "css/estilos.css",
 "img/icono2048.png",
 "img/maskable_icon_x48.png",
 "img/maskable_icon_x72.png",
 "img/maskable_icon_x96.png",
 "img/maskable_icon_x128.png",
 "img/maskable_icon_x192.png",
 "img/maskable_icon_x384.png",
 "img/maskable_icon_x512.png",
 "img/maskable_icon.png",
 "js/config.js",
 "js/mi-nav.js",
 "js/recomienda.js",
 "lib/css/cards.css",
 "lib/css/filled.css",
 "lib/css/icon.css",
 "lib/css/list.css",
 "lib/css/material-symbols-outlined.css",
 "lib/css/md3.css",
 "lib/css/navBar.css",
 "lib/css/navDrw.css",
 "lib/css/navTab.css",
 "lib/css/outline.css",
 "lib/css/roboto.css",
 "lib/css/segmented.css",
 "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
 "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
 "lib/fonts/roboto-v30-latin-regular.woff",
 "lib/fonts/roboto-v30-latin-regular.woff2",
 "lib/js2/custom/center-aligned-top-app-bar.js",
 "lib/js2/custom/menu-option.js",
 "lib/js2/custom/overflow-menu.js",
 "lib/js2/custom/select-menu.js",
 "lib/js2/custom/text-field.js",
 "lib/js2/custom/top-app-bar.js",
 "lib/js2/constantes.js",
 "lib/js2/getAttribute.js",
 "lib/js2/md3.js",
 "lib/js2/msg.js",
 "lib/js2/muestraError.js",
 "lib/js2/regSw.js",
 "lib/js2/setBooleanAttribute.js",
 "ayuda.html",
 "favicon.ico",
 "index.html",
 "site.webmanifest",
 "/"
]

if (self instanceof
 ServiceWorkerGlobalScope) {
 // Evento al empezar a instalar

  self.addEventListener("push",
  notifica)
  
 self.addEventListener("install",
  instala)

 // Evento al solicitar a la red
 self.addEventListener("fetch",
  descargaDatos)

 // Evento cuando está activo.
 self.addEventListener("activate",
  activo)
}

function activo() {
 console.log(
  "Service Worker activo.")
}

/**
 * @param {ExtendableEvent} evt
 */
function instala(evt) {
 console.log(
  "Service Worker instalando.")
 evt.waitUntil(cargaCache())
}

/**
 * @param {FetchEvent} evt
 */
function descargaDatos(evt) {
 if (
  evt.request.method === "GET") {
  evt.respondWith(usaCache(evt))
 }
}

async function cargaCache() {
 console.log(
  "Intentando cargar cache:",
  CACHE)
 // Borra todos los chaches.
 const keys = await caches.keys()
 for (const key of keys) {
  await caches.delete(key)
 }
 // Carga el nuevo contenido.
 const cache =
  await caches.open(CACHE)
 await cache.addAll(ARCHIVOS)
 console.
  log("Cache cargado:", CACHE)
 console.log("Versión:", VERSION)
}

/** @param {PushEvent} evt */
async function notifica(evt) {
 const data = evt.data
 if (data !== null
  && self instanceof
  ServiceWorkerGlobalScope
  && self.Notification
   .permission === 'granted') {
  const mensaje = data.text()
  evt.waitUntil(
   self.registration.
    showNotification(mensaje))
 }
}

/** @param {FetchEvent} evt */
async function usaCache(evt) {
 // Busca el contenido del cache.
 const cache =
  await caches.open(CACHE)
 const response =
  await cache.match(evt.request,
   { ignoreSearch: true })
 if (response !== undefined) {
  /* Si lo encuentra, devuelve el
   * archivo del cache. */
  return response
 } else {
  /* Si no lo encuentra, lo
   * empieza a descargar de la red
   * y devuelve la promesa. */
  return fetch(evt.request)
 }
}