// const studentRef = db.collection('students').doc();
// const statsRef = db.collection('students').doc('--stats--');

// const increment = firebase.firestore.FieldValue.increment(1);

// const batch = db.batch();
// const storyRef = db.collection('students').doc(`${Math.random()}`);
// batch.set(studentRef, { title: 'New Story!' });
// batch.set(statsRef, { storyCount: increment }, { merge: true });
// batch.commit();
// db.collection('...').get().then(snap => {
//     size = snap.size // will return the collection size
//  });
import firebase from "firebase";
const config = require("./FIREBASE_CONFIG.js").config;
var app = firebase.initializeApp(config);
var db = firebase.firestore(app);


var studentsRef = db.collection("students");

let count = 0;
studentsRef.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      count += 1;
      // console.log(doc.id, " => ", doc.data());
      console.log(count);

  });
});
console.log(count);