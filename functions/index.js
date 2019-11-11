// import firebase from "firebase";
const functions = require("firebase-functions");
const firebase = require("firebase");
// const FieldValue = require('firebase-admin').firestore.FieldValue;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const config = require("./FIREBASE_CONFIG.js").config;
var app = firebase.initializeApp(config);
var db = firebase.firestore(app);
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);
exports.updateSubjectCount = functions.firestore
	.document("students/{documentID}")
	.onWrite((change, context) => {
		var countRef = db.collection("subject-stats").doc("--count--");
		if (!change.before.exists) {
			// New document Created : add one to count
			countRef.update({ count: increment });
		} else if (change.before.exists && change.after.exists) {
			// Updating existing document : Do nothing
		} else if (!change.after.exists) {
			// Deleting document : subtract one from count
			countRef.update({ count: decrement });
		}

		return;
	});
exports.updateIndividualSubjectStats = functions.firestore
	.document("students/{documentID}")
	.onWrite((change, context) => {
		let subject_cie_list = [[], [], [], [], []];
		let sem_list = [[], [], [], [], []];
		let final_list = [[], [], [], [], []];
		db.collection("students")
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.data());
					for (let i = 0; i < 5; i++) {
						subject_cie_list[i].push(
							cie_average(
								doc.get("subject" + (i + 1) + ".cie1"),
								doc.get("subject" + (i + 1) + ".cie2"),
								doc.get("subject" + (i + 1) + ".cie3")
							).toFixed(2)
						);
						sem_list[i].push(doc.get("subject" + (i + 1) + ".sem"));
					}
				});
				let num_students = subject_cie_list[0].length;
				let num_subjects = 5;
				for (let i = 0; i < num_subjects; i++) {
					for (let j = 0; j < subject_cie_list[0].length; j++) {
						final_list[i][j] = parseInt(subject_cie_list[i][j]) + parseInt(sem_list[i][j]);
					}
				}
				
				let pass_rate = [0, 0, 0, 0, 0];
				let pass_count = [0, 0, 0, 0, 0];
				for (let i = 0; i < 5; i++) {
					for (let j = 0; j < num_students; j++) {
						if (final_list[i][j] > 40) {
							pass_count[i] += 1;
						}
					}
				}
				for (let i = 0; i < pass_rate.length; i++) {
					pass_rate[i] = ((pass_count[i] / num_students) * 100).toFixed(2);
				}
				console.log(
					"Num Students: " +
						num_students +
						"\n\nPass Rate:" +
						pass_rate +
						"\n\nSubject CIE List:" +
						subject_cie_list +
						"\n\nSemester list:" +
						sem_list +
						"\n\nFinal Marks List:" +
						final_list
				);
				return [pass_rate, final_list, sem_list, subject_cie_list];
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error);
			});
	});
function cie_average(cie1, cie2, cie3) {
	return (cie1 + cie2 + cie3) / 3;
}
