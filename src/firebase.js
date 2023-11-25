import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAdzG7xLykj5Dg3Roe7-RKacseeJR45yOc",
  authDomain: "todo-app-ea2d3.firebaseapp.com",
  projectId: "todo-app-ea2d3",
  storageBucket: "todo-app-ea2d3.appspot.com",
  messagingSenderId: "430115296168",
  appId: "1:430115296168:web:9702a17e029b817e4f839d",
  measurementId: "G-R18SBJQBZ0"
};

const app = initializeApp(firebaseConfig);

export default app ;