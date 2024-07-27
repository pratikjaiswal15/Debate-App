var admin = require("firebase-admin");
var serviceAccount = require('../debate-discuss-firebase-adminsdk-kuy83-b615bf961e.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://debate-discuss.firebaseio.com"
  });

module.exports = admin;  
