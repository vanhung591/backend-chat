import * as FirebaseAdmin from "firebase-admin";

const credentialAuth = require("./frontend-b8971-firebase-adminsdk-3zm9m-e581d15c4e.json");

try {
  FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(credentialAuth)
  });
  console.log("Firebase admin initialized")
} catch (err: any){
  console.error("Firebase admin initialization error: ")
}

const firestoreAdmin = FirebaseAdmin.firestore();

export {FirebaseAdmin, firestoreAdmin}