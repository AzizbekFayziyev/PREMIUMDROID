importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyDhbAx3Yb9btyBOOZChkKXED-OwnGon9r4",
    authDomain: "fb-curd-e493b.firebaseapp.com",
    projectId: "fb-curd-e493b",
    storageBucket: "fb-curd-e493b.appspot.com",
    messagingSenderId: "281875082659",
    appId: "1:281875082659:web:085bc347bd919ae1783e16"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});