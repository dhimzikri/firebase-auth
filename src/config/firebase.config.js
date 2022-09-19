import {getApp, getApps, initializeApp} from 'firebase/app'
import {} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD7aLX4oONpD5hboFEp_7cq9d6DdnJT_gE",
    authDomain: "fir-auth-86641.firebaseapp.com",
    projectId: "fir-auth-86641",
    storageBucket: "fir-auth-86641.appspot.com",
    messagingSenderId: "760801822902",
    appId: "1:760801822902:web:e479c96da1977092ee7e17"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
export {app};