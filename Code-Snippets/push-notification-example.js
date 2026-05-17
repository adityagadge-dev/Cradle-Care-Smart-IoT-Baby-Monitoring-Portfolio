async function sendPushNotification(expoPushToken) {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: expoPushToken,
      sound: "default",
      title: "Baby Alert",
      body: "Cry detected!",
    }),
  });
}