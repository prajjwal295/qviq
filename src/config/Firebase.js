import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTg4wB1msRK0Q4hSFYgsM0lRourR4TY2w",
  authDomain: "social-view-762f9.firebaseapp.com",
  projectId: "social-view-762f9",
  storageBucket: "social-view-762f9.appspot.com",
  messagingSenderId: "639704025517",
  appId: "1:639704025517:web:e51ea4e47c6e0d42507924",
  measurementId: "G-WLTFFYQM74",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
