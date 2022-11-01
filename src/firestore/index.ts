import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "todo-list-web-a3caa.firebaseapp.com",
  projectId: "todo-list-web-a3caa",
  storageBucket: "todo-list-web-a3caa.appspot.com",
  messagingSenderId: "937199532761",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db
