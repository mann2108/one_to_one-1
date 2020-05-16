const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

var db = admin.database();
var ref = db.ref('users');

exports.yoo = functions.database.ref('users').onWrite(event =>{
    // const data = event.data;
    ref.on('child_added', (snapshot, child) =>{
        console.log(snapshot.val(), child)
    })
})

// exports.createProfile = functions.auth.user().onCreate(event => {
//     return admin.database().ref(`/users/${event.data.name}`).set({
//         adminvalue: "jeet added value"
//     })
// })

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     const orginal = req.query.text;
//     const snapshot = await admin.database().ref('function/').push({ orginal: orginal });
//     admin.database().ref('users/').on('child_added', (prevstate) =>{
//         console.log(prevstate.val())
//     })
//     res.redirect(303, snapshot.ref.toString());
// })

// exports.make = functions.database.ref('users/').onWrite(event =>{
//     const user = event.data;
//     var userObject = {
//         name: user.name,
//         phone: user.phone,
//         createass: "jeet"
//     };
//     admin.database().ref('users/' + userObject);
// });

// exports.make = functions.database.ref('users/').onCreate((snapshot, context) =>{
//     const original = snapshot.val()
//     console.log("UpperCassing ", original)
//     return admin.database().ref('function/orginal/').set("I AM FINALLY HERE")
// })