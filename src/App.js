import * as React from "react";
import {
  StudentList,
  StudentShow,
  StudentEdit,
  StudentCreate
} from "./students";
import { Admin, Resource } from "react-admin";
// import { StaffList, StaffEdit, StaffCreate,StaffShow} from './staff';
// import { ParentList, ParentEdit, ParentCreate, ParentShow } from './parents';
import {
  FirebaseRealTimeSaga,
  FirebaseDataProvider,
  FirebaseAuthProvider
} from "react-admin-firebase";

const config = require("./FIREBASE_CONFIG.js").config;

const authProvider = FirebaseAuthProvider(config);
const dataProvider = FirebaseDataProvider(config);

const options = {
  observe: ["students"]
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
      </Admin>
    );
  }
}

export default App;
