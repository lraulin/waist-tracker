const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotifications = functions.database
  .ref('/messages/{messageId}')
  .onWrite((event) => {
    // const snapshot = event.data;
    const payload = {
      notification: {
        title: 'Testing...Testing...',
        // body: `${snapshot.val().msg}`,
        icon: 'assets/icon.png',
        // click_action: `https://${functions.config().firebase.authDomain}`,
      },
    };
    return admin.database().ref('fcmTokens').once('value').then((allTokens) => {
      if (allTokens.val()) {
        const tokens = [];
        for (let fcmTokenKey in allTokens.val()) {
          const fcmToken = allTokens.val()[fcmTokenKey];
          tokens.push(fcmToken.token);
        }
        if (tokens.length > 0) {
          return admin
            .messaging()
            .sendToDevice(tokens, payload)
            .then((response) => {
              const tokensToRemove = [];
              response.results.forEach((result, index) => {
                const error = result.error;
              });
              return Promise.all(tokensToRemove);
            });
        }
      }
    });
  });

// Works now!!!
// functions.config().firebase) is undefined
