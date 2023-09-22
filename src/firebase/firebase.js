import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDhbAx3Yb9btyBOOZChkKXED-OwnGon9r4",
  authDomain: "fb-curd-e493b.firebaseapp.com",
  projectId: "fb-curd-e493b",
  storageBucket: "fb-curd-e493b.appspot.com",
  messagingSenderId: "281875082659",
  appId: "1:281875082659:web:085bc347bd919ae1783e16"
};

const app = initializeApp(firebaseConfig, "default");
export const db = getDatabase(app);
export const messaging = getMessaging(app);
