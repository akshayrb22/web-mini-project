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
import { SubjectResultList } from "./subjectResults";
const config = require("./FIREBASE_CONFIG.js").config;

const authProvider = FirebaseAuthProvider(config);
const dataProvider = FirebaseDataProvider(config);


const options = {
  observe: ["students", "subject-stats"]
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
          list={StudentList}
          show={StudentShow}
          edit={StudentEdit}
          create={StudentCreate}
        />
        <Resource name="Overall Results" list={ResultsList} />
        <Resource name="Subject Results" list={SubjectResultList} />
      </Admin>
    );
  }
}
export default App;
