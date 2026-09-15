// Demo placeholder — push notifications disabled in portfolio demo mode.
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'demo-api-key-not-used',
    authDomain: 'glowcart-demo.firebaseapp.com',
    projectId: 'glowcart-demo',
    storageBucket: 'glowcart-demo.appspot.com',
    messagingSenderId: '000000000000',
    appId: '1:000000000000:web:demo000000',
    measurementId: 'G-DEMO000000',
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('Demo mode: background message ignored.', payload);
    return Promise.resolve();
});
