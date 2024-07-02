const Firebase=require('../config')
const admin = require('firebase-admin');

const serviceAccount = require('./codequest-9c7dd-firebase-adminsdk-hx7o6-f682711597.json'); // Your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: Firebase.storageBucket
});

const bucket = admin.storage().bucket();

module.exports ={bucket} ;
