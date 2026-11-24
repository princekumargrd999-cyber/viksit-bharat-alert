self.addEventListener("push", e => {
  const d = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(d.title || "विकसित भारत अलर्ट", {
    body: d.body || "", data: d.id || "", tag: d.id || "news", badge: d.icon, icon: d.icon
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = self.registration.scope + (e.notification.data ? "#post=" + e.notification.data : "");
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) if (c.url.startsWith(self.registration.scope)) { c.navigate(url); return c.focus(); }
    return clients.openWindow(url);
  }));
});
