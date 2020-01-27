# Web Mini Project
This is a simple React-Admin web application which allows the users to enter, modify and view student details. It uses Firebase Cloud Firestore as the backend. This project was done as a mini project for the ```WEB LABORATORY WITH MINI PROJECT``` course under the Information Science and Engineering program under VTU.

## Project Details
With this project, we have covered 3 aspects of the student's academics: 
1. Student Details - this contains the student's names and the subjects they have taken up.
2. Overall Subject Results - this contains a detailed explanation of the student's academics
3. Subject Band Results - this section contains the percentage of students who have achieved lesser than average(red band), average(yellow band) and greater than average(green band) for each subject's exams.

## Getting Started

You need to add the private Firebase connection file: `src/FIREBASE_CONFIG.js` with the following format from firebase:

``` js
export const config = {
  apiKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  authDomain: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  databaseURL: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  projectId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  storageBucket: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  messagingSenderId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
};
```

Don't forget to add the `export` infront of the configuration that Firebase gives you!

Then just run `npm run start`

