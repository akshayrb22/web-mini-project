import * as React from "react";
import { Datagrid, List, TextField, NumberField, Query } from "react-admin";

// let collectionRef = firestore.collection('students');
// let numDocs = collectionRef.listDocuments().then(documentRefs => {
//    return firestore.getAll(documentRefs);
// }).then(documentSnapshots => {
//    for (let documentSnapshot of documentSnapshots) {
//       if (documentSnapshot.exists) {
//         console.log(`Found document with data: ${documentSnapshot.id}`);
//       } else {
//         console.log(`Found missing document: ${documentSnapshot.id}`);
//       }
//    }
// });
// });

export const ResultsList = props => (
    <List {...props}>
        <Datagrid>
            <NumberField source={} label="Students Attempted"/>
            <NumberField source="" label="Pass Percentage"/>
            <NumberField source="" label="CIE Minimum" />
            <NumberField source="" label="CIE Maximum" />
            <NumberField source="" label="CIE Average" />
            <NumberField source="" label="Sem Minimum" />
            <NumberField source="" label="Sem Maximum" />
            <NumberField source="" label="Sem Average" />
            <NumberField source="" label="Final Minimum" />
            <NumberField source="" label="Final Maximum" />
            <NumberField source="" label="Final Average" />
        </Datagrid>
    </List>
);
// export const QueriedResultList = ({ record }) => (
//     <Query type="GET_LIST" resource="students" payload={{}}>

//     </Query>
// )