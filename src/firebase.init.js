import { getAuth} from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUJBhFA3cniC8m_re5_pdT_wnrQk5QYRE",
  authDomain: "gunparts-c9161.firebaseapp.com",
  projectId: "gunparts-c9161",
  storageBucket: "gunparts-c9161.appspot.com",
  messagingSenderId: "312311649382",
  appId: "1:312311649382:web:3418ce49485e9e332c89a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
