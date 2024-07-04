import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOyNLeDj8aYr5AvJ13ts_iZOzFu1lLOak",
  authDomain: "job-portal-91bc5.firebaseapp.com",
  projectId: "job-portal-91bc5",
  storageBucket: "job-portal-91bc5.appspot.com",
  messagingSenderId: "526071761542",
  appId: "1:526071761542:web:836fd13d9a547a3e4fdf07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;