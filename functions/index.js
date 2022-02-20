const functions = require("firebase-functions")

const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.createUser = functions.auth.user().onCreate((user) => {
  return db.doc(`users/${user.uid}`).set({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
    provider: user.providerData[0].providerId,
  })
})

exports.deleteUser = functions.auth.user().onDelete((user) => {
  return db.doc(`users/${user.uid}`).delete()
})
