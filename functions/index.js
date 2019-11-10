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
					subject_cie_list[0].push(
						cie_average(
							doc.data["subject1[2]"],
							doc.data["subject1[3]"],
							doc.data["subject1[4]"]
						)
					);
					subject_cie_list[1].push(
						cie_average(
							doc.data["subject2[2]"],
							doc.data["subject2[3]"],
							doc.data["subject2[4]"]
						)
					);
					subject_cie_list[2].push(
						cie_average(
							doc.data["subject3[2]"],
							doc.data["subject3[3]"],
							doc.data["subject3[4]"]
						)
					);
					subject_cie_list[3].push(
						cie_average(
							doc.data["subject4[2]"],
							doc.data["subject4[3]"],
							doc.data["subject4[4]"]
						)
					);
					subject_cie_list[4].push(
						cie_average(
							doc.data["subject5[2]"],
							doc.data["subject5[3]"],
							doc.data["subject5[4]"]
						)
					);
					sem_list[0].push(doc.data["subject1[5]"]);
					sem_list[1].push(doc.data["subject2[5]"]);
					sem_list[2].push(doc.data["subject3[5]"]);
					sem_list[3].push(doc.data["subject4[5]"]);
					sem_list[4].push(doc.data["subject5[5]"]);
				});
				for (let i = 0; i < final_list.length; i++) {
					final_list[i] = subject_cie_list[i].map(function(num, idx) {
						return num + sem_list[idx];
					});
				}
				let num_students = final_list[0].length;
				let pass_rate = [0, 0, 0, 0, 0];
				let pass_count = [0, 0, 0, 0, 0];
				for (let i = 0; i < final_list[0].length; i++) {
					if (final_list[0][i] < 40) {
						pass_count[0] += 1;
					}
					if (final_list[1][i] < 40) {
						pass_count[1] += 1;
					}
					if (final_list[2][i] < 40) {
						pass_count[2] += 1;
					}
					if (final_list[3][i] < 40) {
						pass_count[3] += 1;
					}
					if (final_list[4][i] < 40) {
						pass_count[4] += 1;
					}
				}
				for (let i = 0; i < pass_rate.length; i++) {
					pass_rate[i] = (pass_count / num_students) * 100;
				}
				console.log("");
				return [pass_rate, final_list, sem_list, subject_cie_list];
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error);
			});
		
	});
function cie_average(cie1, cie2, cie3) {
	return (cie1 + cie2 + cie3) / 3;
}
