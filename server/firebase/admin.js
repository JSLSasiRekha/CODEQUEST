const admin = require('firebase-admin');
const { serviceAccount, storageBucket } = require('../config');

 // Your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: storageBucket
});

const bucket = admin.storage().bucket();

module.exports = {bucket} ;

