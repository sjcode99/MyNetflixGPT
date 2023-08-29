import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1ccfbP_u7WFm_3zKHFK5CC1GrehO5Xtk",
  authDomain: "netflixgpt-df532.firebaseapp.com",
  projectId: "netflixgpt-df532",
  storageBucket: "netflixgpt-df532.appspot.com",
  messagingSenderId: "274141125918",
  appId: "1:274141125918:web:265bd31309906860317d0f",
  measurementId: "G-KZH6HQTTVJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
