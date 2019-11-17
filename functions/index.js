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
						final_list[i][j] =
							parseInt(subject_cie_list[i][j]) + parseInt(sem_list[i][j]);
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
				// console.log(
				// 	"Num Students: " +
				// 		num_students +
				// 		"\n\nPass Rate:" +
				// 		pass_rate +
				// 		"\n\nSubject CIE List:" +
				// 		subject_cie_list +
				// 		"\n\nSemester list:" +
				// 		sem_list +
				// 		"\n\nFinal Marks List:" +
				// 		final_list
				// );
				let overall_stats = compute_subject_stats(
					final_list,
					sem_list,
					subject_cie_list
				);
				let cie_stats = overall_stats[0];
				let sem_stats = overall_stats[1];
				let final_stats = overall_stats[2];

				let cie_min = cie_stats[0];
				let cie_max = cie_stats[1];
				let cie_avg = cie_stats[2];

				let sem_min = sem_stats[0];
				let sem_max = sem_stats[1];
				let sem_avg = sem_stats[2];

				let final_min = final_stats[0];
				let final_max = final_stats[1];
				let final_avg = final_stats[2];

				for (let i = 0; i < 5; i++) {
					let data = {
						cie_min: cie_min[i],
						cie_max: cie_max[i],
						cie_avg: cie_avg[i],

						sem_min: sem_min[i],
						sem_max: sem_max[i],
						sem_avg: sem_avg[i],

						final_min: final_min[i],
						final_max: final_max[i],
						final_avg: final_avg[i],

						pass_rate: parseInt(pass_rate[i])
					};

					let set_doc = db
						.collection("subject-stats")
						.doc("subject" + (i + 1).toString())
						.set(data);
				}

				return [pass_rate, final_list, sem_list, subject_cie_list];
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error);
			});
	});
function cie_average(cie1, cie2, cie3) {
	return (cie1 + cie2 + cie3) / 3;
}
function compute_subject_stats(final_list, sem_list, subject_cie_list) {
	final_max = [];
	final_min = [];
	final_avg = [];

	sem_max = [];
	sem_min = [];
	sem_avg = [];

	cie_max = [];
	cie_min = [];
	cie_avg = [];
	// subject_cie_list = subject_cie_list.map(Number);
	sum = 0;
	for (let i = 0; i < final_list.length; i++) {
		final_min[i] = Math.min(...final_list[i]);
		sem_min[i] = Math.min(...sem_list[i]);
		cie_min[i] = Math.min(...subject_cie_list[i]);

		final_max[i] = Math.max(...final_list[i]);
		sem_max[i] = Math.max(...sem_list[i]);
		cie_max[i] = Math.max(...subject_cie_list[i]);

		sum = 0;
		sum = final_list[i].reduce((previous, current) => (current += previous));
		final_avg[i] = (sum / final_list[i].length).toFixed(2);

		sum = 0;
		sum = sem_list[i].reduce((previous, current) => (current += previous));
		sem_avg[i] = (sum / final_list[i].length).toFixed(2);

		sum = 0;
		console.log(
			"Subject " + (i + 1).toString() + " CIE List: " + 	subject_cie_list[i]
		);
		sum = subject_cie_list[i].reduce(
			(previous, current) => (current = Number(current) + Number(previous))
		);
		console.log("Subject " + (i + 1).toString() + " sum: " + sum);
		cie_avg[i] = (sum / final_list[i].length).toFixed(2);
	}
	final_avg = final_avg.map(Number);
	sem_avg = sem_avg.map(Number);
	cie_avg = cie_avg.map(Number);
	final_stats = [final_min, final_max, final_avg];
	sem_stats = [sem_min, sem_max, sem_avg];
	cie_stats = [cie_min, cie_max, cie_avg];
	overall_stats = [cie_stats, sem_stats, final_stats];
	return overall_stats;
}
