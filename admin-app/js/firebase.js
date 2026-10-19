import {initializeApp} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {getAnalytics,isSupported} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";
import * as A from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import * as F from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
const app=initializeApp({apiKey:"AIzaSyAe4YdoPdpfDn0u56RBOjLOTXSX1LERJEE",authDomain:"bd-blood-donor01.firebaseapp.com",projectId:"bd-blood-donor01",storageBucket:"bd-blood-donor01.firebasestorage.app",messagingSenderId:"612859381343",appId:"1:612859381343:web:25109bb3e55fc1e01bfdea",measurementId:"G-71ELRL2450"});
isSupported().then(ok=>ok&&getAnalytics(app)).catch(()=>{});
let _db;try{_db=F.initializeFirestore(app,{localCache:F.persistentLocalCache({tabManager:F.persistentMultipleTabManager()})})}catch(e){_db=F.getFirestore(app)}
export const auth=A.getAuth(app),db=_db;
export {A,F};
