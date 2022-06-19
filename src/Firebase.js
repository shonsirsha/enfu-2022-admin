import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseClientInitConfig = {
  apiKey: 'AIzaSyDcIA5FmgvRQmPNdyy_YhuhU1gokyVViF0',
  authDomain: 'enfu2022.firebaseapp.com',
  projectId: 'enfu2022',
  storageBucket: 'enfu2022.appspot.com',
  messagingSenderId: '97582214412',
  appId: '1:97582214412:web:8c34a6f5a52925fa9fad29'
}

// Initialize Firebase
initializeApp(firebaseClientInitConfig)

export const auth = getAuth()
