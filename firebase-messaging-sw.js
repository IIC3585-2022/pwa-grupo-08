importScripts(
  'https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyCEi8Sli7LzDwvZN2-GDataElZyDDvvAg4',
  authDomain: 'pwa-grupo-8.firebaseapp.com',
  projectId: 'pwa-grupo-8',
  storageBucket: 'pwa-grupo-8.appspot.com',
  messagingSenderId: '179603256271',
  appId: '1:179603256271:web:eee9a5570fa24c36e8d8ba',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background: ', payload.data);

  console.log('Sending data to notification');
  try {
    self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
      clients.forEach((client) => {
        console.log('Sending to client ' + client);
        client.postMessage({
          data: payload.data,
        });
      });
    });
  } catch (e) {
    console.log(e);
  }

  // Customize notification here
  const notificationTitle = '¡Recibiste un nuevo mensaje!';
  const notificationOptions = {
    body: 'Ve al Chat de Terra para revisarlo',
    icon: '/favicon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
