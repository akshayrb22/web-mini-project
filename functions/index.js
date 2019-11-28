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
// const increment = firebase.firestore.FieldValue.increment(1);
// const decrement = firebase.firestore.FieldValue.increment(-1);
// exports.updateSubjectCount = functions.firestore
// 	.document("students/{documentID}")
// 	.onWrite((change, context) => {
// 		var countRef = db.collection("subject-stats").doc("--count--");
// 		if (!change.before.exists) {
// 			// New document Created : add one to count
// 			countRef.update({ count: increment });
// 		} else if (change.before.exists && change.after.exists) {
// 			// Updating existing document : Do nothing
// 		} else if (!change.after.exists) {
// 			// Deleting document : subtract one from count
// 			countRef.update({ count: decrement });
// 		}
// 		return;
// 	});
exports.updateIndividualSubjectStats = functions.firestore
	.document("students/{documentID}")
	.onWrite((change, context) => {
		let subject_cie_list = [[], [], [], [], []];
		let sem_list = [[], [], [], [], []];
		let final_list = [[], [], [], [], []];
		let subject_names = [];
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
						subject_names.push(doc.get("subject" + (i + 1) + ".name"));
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
						count: num_students,
						pass_rate: parseInt(pass_rate[i]),
						name: subject_names[i]
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
		sum = subject_cie_list[i].reduce(
			(previous, current) => (current = Number(current) + Number(previous))
		);
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

exports.updateSubjectBands = functions.firestore
	.document("students/{documentID}")
	.onWrite((change, context) => {
		let cie1_list = [[], [], [], [], []];
		let cie2_list = [[], [], [], [], []];
		let cie3_list = [[], [], [], [], []];
		let sem_list = [[], [], [], [], []];
		let final_list = [[], [], [], [], []];
		let current_cie1, current_cie2, current_cie3;

		db.collection("students")
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					for (let i = 0; i < 5; i++) {
						current_cie1 = doc.get("subject" + (i + 1) + ".cie1");
						current_cie2 = doc.get("subject" + (i + 1) + ".cie2");
						current_cie3 = doc.get("subject" + (i + 1) + ".cie3");
						current_sem = doc.get("subject" + (i + 1) + ".sem");
						cie1_list[i].push(current_cie1);
						cie2_list[i].push(current_cie2);
						cie3_list[i].push(current_cie3);
						sem_list[i].push(current_sem);
						current_final = cie_average(current_cie1, current_cie2, current_cie3) + current_sem;
						final_list[i].push(current_final);
					}
				});
				// console.log(final_list);
				let num_subjects = 5;
				let num_students = cie1_list[0].length;
				let red_band_object = {cie1: [[], [], [], [], []], cie2: [[], [], [], [], []], cie3: [[], [], [], [], []], sem: [[], [], [], [], []], final: [[], [], [], [], []]};
				let yellow_band_object = {cie1: [[], [], [], [], []], cie2: [[], [], [], [], []], cie3: [[], [], [], [], []], sem: [[], [], [], [], []], final: [[], [], [], [], []]};
				let green_band_object = {cie1: [[], [], [], [], []], cie2: [[], [], [], [], []], cie3: [[], [], [], [], []], sem: [[], [], [], [], []], final: [[], [], [], [], []]};
				for (let i = 0; i < num_subjects; i++) {
					for (let j = 0; j < num_students; j++) {
						if (cie1_list[i][j] < 0.65 * 20) {
							red_band_object.cie1[i].push(cie1_list[i][j]).toFixed(2);
						} else if (cie1_list[i][j] > 0.8 * 20) {
							green_band_object.cie1[i].push(cie1_list[i][j]).toFixed(2);
						} else {
							yellow_band_object.cie1[i].push(cie1_list[i][j]).toFixed(2);
						}

						if (cie2_list[i][j] < 0.65 * 20) {
							red_band_object.cie2[i].push(cie2_list[i][j]).toFixed(2);
						} else if (cie2_list[i][j] > 0.8 * 20) {
							green_band_object.cie2[i].push(cie2_list[i][j]).toFixed(2);
						} else {
							yellow_band_object.cie2[i].push(cie2_list[i][j]).toFixed(2);
						}

						if (cie3_list[i][j] < 0.65 * 20) {
							red_band_object.cie3[i].push(cie3_list[i][j]).toFixed(2);
						} else if (cie3_list[i][j] > 0.8 * 20) {
							green_band_object.cie3[i].push(cie3_list[i][j]).toFixed(2);
						} else {
							yellow_band_object.cie3[i].push(cie3_list[i][j]).toFixed(2);
						}

						if (sem_list[i][j] < 0.65 * 80) {
							red_band_object.sem[i].push(sem_list[i][j]).toFixed(2);
						} else if (sem_list[i][j] > 0.8 * 80) {
							green_band_object.sem[i].push(sem_list[i][j]).toFixed(2);
						} else {
							yellow_band_object.sem[i].push(sem_list[i][j]).toFixed(2);
						}

						if (final_list[i][j] < 0.65 * 100) {
							red_band_object.final[i].push(final_list[i][j]).toFixed(2);
						} else if (final_list[i][j] > 0.8 * 100) {
							green_band_object.final[i].push(final_list[i][j]).toFixed(2);
						} else {
							yellow_band_object.final[i].push(final_list[i][j]).toFixed(2);
						}
					}
				}
				let cie1_data = {
					name: "CIE 1",
					subject1: {
						name: "WEB",
						red_band: ((red_band_object.cie1[0].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie1[0].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie1[0].length/num_students) * 100.0).toFixed(2)
					}, 
					subject2: {
						name: "SA",
						red_band: ((red_band_object.cie1[1].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie1[1].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie1[1].length/num_students) * 100.0).toFixed(2)
					}, 
					subject3: {
						name: "ML",
						red_band: ((red_band_object.cie1[2].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie1[2].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie1[2].length/num_students) * 100.0).toFixed(2)
					}, 
					subject4: {
						name: "INS",
						red_band: ((red_band_object.cie1[3].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie1[3].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie1[3].length/num_students) * 100.0).toFixed(2)
					}, 
					subject5: {
						name: "IMS",
						red_band: ((red_band_object.cie1[4].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie1[4].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie1[4].length/num_students) * 100.0).toFixed(2)
					}
				};
				db.collection("subjects").doc("CIE1").set(cie1_data);

				
				let cie2_data = {
					name: "CIE 2",
					subject1: {
						name: "WEB",
						red_band: ((red_band_object.cie2[0].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie2[0].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie2[0].length/num_students) * 100.0).toFixed(2)
					}, 
					subject2: {
						name: "SA",
						red_band: ((red_band_object.cie2[1].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie2[1].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie2[1].length/num_students) * 100.0).toFixed(2)
					}, 
					subject3: {
						name: "ML",
						red_band: ((red_band_object.cie2[2].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie2[2].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie2[2].length/num_students) * 100.0).toFixed(2)
					}, 
					subject4: {
						name: "INS",
						red_band: ((red_band_object.cie2[3].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie2[3].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie2[3].length/num_students) * 100.0).toFixed(2)
					}, 
					subject5: {
						name: "IMS",
						red_band: ((red_band_object.cie2[4].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie2[4].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie2[4].length/num_students) * 100.0).toFixed(2)
					}
				};
				db.collection("subjects").doc("CIE2").set(cie2_data);

				let cie3_data = {
					name: "CIE 3",
					subject1: {
						name: "WEB",
						red_band: ((red_band_object.cie3[0].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie3[0].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie3[0].length/num_students) * 100.0).toFixed(2)
					}, 
					subject2: {
						name: "SA",
						red_band: ((red_band_object.cie3[1].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie3[1].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie3[1].length/num_students) * 100.0).toFixed(2)
					}, 
					subject3: {
						name: "ML",
						red_band: ((red_band_object.cie3[2].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie3[2].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie3[2].length/num_students) * 100.0).toFixed(2)
					}, 
					subject4: {
						name: "INS",
						red_band: ((red_band_object.cie3[3].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie3[3].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie3[3].length/num_students) * 100.0).toFixed(2)
					}, 
					subject5: {
						name: "IMS",
						red_band: ((red_band_object.cie3[4].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.cie3[4].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.cie3[4].length/num_students) * 100.0).toFixed(2)
					}
				};
				db.collection("subjects").doc("CIE3").set(cie3_data);

				let sem_data = {
					name: "Semester End Exam",
					subject1: {
						name: "WEB",
						red_band: ((red_band_object.sem[0].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.sem[0].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.sem[0].length/num_students) * 100.0).toFixed(2)
					}, 
					subject2: {
						name: "SA",
						red_band: ((red_band_object.sem[1].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.sem[1].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.sem[1].length/num_students) * 100.0).toFixed(2)
					}, 
					subject3: {
						name: "ML",
						red_band: ((red_band_object.sem[2].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.sem[2].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.sem[2].length/num_students) * 100.0).toFixed(2)
					}, 
					subject4: {
						name: "INS",
						red_band: ((red_band_object.sem[3].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.sem[3].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.sem[3].length/num_students) * 100.0).toFixed(2)
					}, 
					subject5: {
						name: "IMS",
						red_band: ((red_band_object.sem[4].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.sem[4].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.sem[4].length/num_students) * 100.0).toFixed(2)
					}
				};
				db.collection("subjects").doc("SemEnd").set(sem_data);

				let final_data = {
					name: "Final",
					subject1: {
						name: "WEB",
						red_band: ((red_band_object.final[0].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.final[0].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.final[0].length/num_students) * 100.0).toFixed(2)
					}, 
					subject2: {
						name: "SA",
						red_band: ((red_band_object.final[1].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.final[1].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.final[1].length/num_students) * 100.0).toFixed(2)
					}, 
					subject3: {
						name: "ML",
						red_band: ((red_band_object.final[2].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.final[2].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.final[2].length/num_students) * 100.0).toFixed(2)
					}, 
					subject4: {
						name: "INS",
						red_band: ((red_band_object.final[3].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.final[3].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.final[3].length/num_students) * 100.0).toFixed(2)
					}, 
					subject5: {
						name: "IMS",
						red_band: ((red_band_object.final[4].length/num_students) * 100.0).toFixed(2), 
						yellow_band: ((yellow_band_object.final[4].length/num_students) * 100.0).toFixed(2), 
						green_band: ((green_band_object.final[4].length/num_students) * 100.0).toFixed(2)
					}
				};
				db.collection("subjects").doc("Final").set(final_data);
				
				// console.log(red_band_object);
				// console.log(yellow_band_object)
				// console.log(green_band_object);
				
				return cie1_list;
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error);
			});
	});
