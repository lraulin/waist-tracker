// importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase.js');
// importScripts(
//   'https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js',
// );
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '103865215407',
});

console.log(firebase.messaging());
