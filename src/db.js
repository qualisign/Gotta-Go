import Firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBwjTjRbkLNI-lovlvj502DgCD1WFdk0Lo",
    authDomain: "gotta-go-app.firebaseapp.com",
    databaseURL: "https://gotta-go-app.firebaseio.com",
    projectId: "gotta-go-app",
    storageBucket: "gotta-go-app.appspot.com",
    messagingSenderId: "576498894231"

}
const app = Firebase.initializeApp(config)

export default app




