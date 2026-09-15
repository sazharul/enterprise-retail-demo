// Firebase push notifications disabled in GlowCart demo
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
