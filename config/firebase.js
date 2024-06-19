const admin = require('firebase-admin');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

admin.initializeApp({
    credential: admin.credential.cert(require('./serviceAccountKey.json')),
    storageBucket: "medexplorer-10c83.appspot.com",
});

const bucket = admin.storage().bucket();
