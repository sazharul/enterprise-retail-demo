// Firebase push notifications disabled in GlowCart demo.
// Set FIREBASE_* env vars and generate a production service worker in deployment.
self.addEventListener("push", (event) => {
  if (!event.data) return;
  const payload = event.data.json();
  const title = payload.notification?.title || "GlowCart";
  event.waitUntil(
    self.registration.showNotification(title, {
      body: payload.notification?.body || "",
      tag: "glowcart-notification",
    })
  );
});
