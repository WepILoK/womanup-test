import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyAuXYn0YibaHVzKxqqFZiQhnA9yDxK6s18",
    authDomain: "womanup-test.firebaseapp.com",
    projectId: "womanup-test",
    storageBucket: "womanup-test.appspot.com",
    messagingSenderId: "584080484755",
    appId: "1:584080484755:web:b5a8eb7900229c3ce6e066",
    measurementId: "G-TW9C78PHSW"
});

const firestore = firebase.firestore()
export const Context = createContext<any>({})

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={{
            firebase,
            firestore
        }}>
            <App/>
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
