importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase.js');

firebase.initializeApp({
  messagingSenderId: '103865215407',
});

console.log('firebase SW: firebase.messaging()');
console.log(firebase.messaging());
