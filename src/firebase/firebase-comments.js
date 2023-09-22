import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC_-RxXyLD68O1b9ZclbKdha7xhRVWc_0Q",
    authDomain: "premiumdroid-comments.firebaseapp.com",
    databaseURL: "https://premiumdroid-comments-default-rtdb.firebaseio.com",
    projectId: "premiumdroid-comments",
    storageBucket: "premiumdroid-comments.appspot.com",
    messagingSenderId: "527372207808",
    appId: "1:527372207808:web:6c146d707a3393abc90f25"
};

const app = initializeApp(firebaseConfig, "seconary");
export const commentsDb = getDatabase(app);