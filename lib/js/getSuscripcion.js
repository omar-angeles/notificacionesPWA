export
 async function getSuscripcion() {
 const registro = await navigator.
  serviceWorker.ready
 return registro.pushManager.
  getSubscription()
}