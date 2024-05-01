import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove, onValue} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDW-LjRmQKRP77Fhq_GJnhauiNpocXaugU",
    authDomain: "he-thong-quan-ly-hoc-thuat.firebaseapp.com",
    databaseURL: "https://he-thong-quan-ly-hoc-thuat-default-rtdb.firebaseio.com",
    projectId: "he-thong-quan-ly-hoc-thuat",
    storageBucket: "he-thong-quan-ly-hoc-thuat.appspot.com",
    messagingSenderId: "91751824548",
    appId: "1:91751824548:web:3e7ea06bbdfc504cad3a31",
    measurementId: "G-0YB3JCB0L3"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, ref, set, get, child, update, remove, onValue };