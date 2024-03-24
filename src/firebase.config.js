import {getApp,getApps,initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBJ3QLtTMB9XlLZ5FG9bSVa9ZjdHPHkcVA",
    authDomain: "restaurantapp-d8a31.firebaseapp.com",
    databaseURL: "https://restaurantapp-d8a31-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-d8a31",
    storageBucket: "restaurantapp-d8a31.appspot.com",
    messagingSenderId: "1042749029189",
    appId: "1:1042749029189:web:293c13b274e24c9ddb5c2c"
  };


  // only intialize if there is no app for avoid every time refresh page
  const app=getApps.length>0 ? getApp() : initializeApp(firebaseConfig);

  const firestore=getFirestore(app);

  const storage=getStorage(app);

  export {app,firestore,storage}; // export all thing


 



  

 