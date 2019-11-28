import * as React from "react";
import {
  StudentList,
  StudentShow,
  StudentEdit,
  StudentCreate
} from "./students";
import { Admin, Resource, ListGuesser } from "react-admin";
import { ResultsList } from "./overallResults";
// import { ParentList, ParentEdit, ParentCreate, ParentShow } from './parents';
import {
  FirebaseRealTimeSaga,
  FirebaseDataProvider,
  FirebaseAuthProvider
} from "react-admin-firebase";
import SubjectBands from "./subjectResults";
const config = require("./FIREBASE_CONFIG.js").config;

const authProvider = FirebaseAuthProvider(config);
const dataProvider = FirebaseDataProvider(config);

const options = {
  observe: ["students", "subject-stats", "subjects"]
};
const firebaseRealtime = FirebaseRealTimeSaga(dataProvider, options);

class App extends React.Component {
  render() {
    return (
      <Admin
        customSagas={[firebaseRealtime]}
        dataProvider={dataProvider}
        authProvider={authProvider}
      >
        <Resource
          name="students"
          options={{ label: "Student Details" }}
          list={StudentList}
          show={StudentShow}
          edit={StudentEdit}
          create={StudentCreate}
        />
        <Resource
          name="subject-stats"
          options={{ label: "Overall Subject Results" }}
          list={ResultsList}
        />
        <Resource
          name="subjects"
          options={{ label: "Subject Band Results" }}
          list={SubjectBands}
        />
      </Admin>
    );
  }
}
export default App;
