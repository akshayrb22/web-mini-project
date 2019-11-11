// in src/students.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Tab,
  TabbedShowLayout,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  NumberInput,
  NumberField,
  TabbedForm,
  FormTab,
  SelectInput
} from "react-admin";


const StudentList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="batch" />
      <TextField source="name" />
      <TextField source="usn" label="USN" />
      <TextField source="subject1[name]" label="Subject 1" />
      <TextField source="subject2[name]" label="Subject 2" />
      <TextField source="subject3[name]" label="Subject 3" />
      <TextField source="subject4[name]" label="Subject 4" />
      <TextField source="subject5[name]" label="Subject 5" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

const StudentEdit = props => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="Personal">
        <SelectInput
          source="batch"
          choices={[
            { id: "16-20", name: "2016 - 2020" },
            { id: "17-21", name: "2017 - 2021" },
            { id: "18-22", name: "2018 - 2022" },
            { id: "19-23", name: "2019 - 2023" }
          ]}
        />
        <TextInput source="name" />
        <TextInput source="usn" label="USN" />
      </FormTab>
      <FormTab label="Subject 1">
        <TextInput source="subject1[name]" label="" />
        <TextInput source="subject1.code" label="Subject 1 Code" />
        <NumberInput source="subject1.cie1" label="CIE 1" />
        <NumberInput source="subject1.cie2" label="CIE 2" />
        <NumberInput source="subject1.cie3" label="CIE 3" />
        <NumberInput source="subject1.sem" label="Final" />
      </FormTab>
      <FormTab label="Subject 2">
        <TextInput source="subject2[name]" label="" />
        <TextInput source="subject2.code" label="Subject 2 Code" />
        <NumberInput source="subject2.cie1" label="CIE 1" />
        <NumberInput source="subject2.cie2" label="CIE 2" />
        <NumberInput source="subject2.cie3" label="CIE 3" />
        <NumberInput source="subject2.sem" label="Final" />
      </FormTab>
      <FormTab label="Subject 3">
        <TextInput source="subject3[name]" label="" />
        <TextInput source="subject3.code" label="Subject 3 Code" />
        <NumberInput source="subject3.cie1" label="CIE 1" />
        <NumberInput source="subject3.cie2" label="CIE 2" />
        <NumberInput source="subject3.cie3" label="CIE 3" />
        <NumberInput source="subject3.sem" label="Final" />
      </FormTab>
      <FormTab label="Subject 4">
        <TextInput source="subject4[name]" label="" />
        <TextInput source="subject4.code" label="Subject 4 Code" />
        <NumberInput source="subject4.cie1" label="CIE 1" />
        <NumberInput source="subject4.cie2" label="CIE 2" />
        <NumberInput source="subject4.cie3" label="CIE 3" />
        <NumberInput source="subject4.sem" label="Final" />
      </FormTab>
      <FormTab label="Subject 5">
        <TextInput source="subject5[name]" label="" />
        <TextInput source="subject5.code" label="Subject 5 Code" />
        <NumberInput source="subject5.cie1" label="CIE 1" />
        <NumberInput source="subject5.cie2" label="CIE 2" />
        <NumberInput source="subject5.cie3" label="CIE 3" />
        <NumberInput source="subject5.sem" label="Final" />
      </FormTab>
    </TabbedForm>
  </Edit>
);
const StudentCreate = props => (
  <Create {...props}>
    <TabbedForm>
      <FormTab label="Personal">
        <SelectInput
          source="batch"
          choices={[
            { id: "16-20", name: "2016 - 2020" },
            { id: "17-21", name: "2017 - 2021" },
            { id: "18-22", name: "2018 - 2022" },
            { id: "19-23", name: "2019 - 2023" }
          ]}
        />
        <TextInput source="name" />
        <TextInput source="usn" label="USN" />
      </FormTab>
      <FormTab label="Subject 1">
        <TextInput source="subject1[name]" label="" />
        <TextInput source="subject1.code" label="Subject 1 Code" />
        <NumberInput source="subject1.cie1" label="CIE 1" />
        <NumberInput source="subject1.cie2" label="CIE 2" />
        <NumberInput source="subject1.cie3" label="CIE 3" />
        <NumberInput source="subject1.sem" label="Final" />
      </FormTab>
      <FormTab label="Subject 2">
        <TextInput source="subject2[name]" label="" />
        <TextInput source="subject2.code" label="Subject 2 Code" />
        <NumberInput source="subject2.cie1" label="CIE 1" />
        <NumberInput source="subject2.cie2" label="CIE 2" />
        <NumberInput source="subject2.cie3" label="CIE 3" />
        <NumberInput source="subject2.sem" label="Final" />
      </FormTab>
      <FormTab label="Subject 3">
        <TextInput source="subject3[name]" label="" />
        <TextInput source="subject3.code" label="Subject 3 Code" />
        <NumberInput source="subject3.cie1" label="CIE 1" />
        <NumberInput source="subject3.cie2" label="CIE 2" />
        <NumberInput source="subject3.cie3" label="CIE 3" />
        <NumberInput source="subject3.sem" label="Final" />
      </FormTab>
      <FormTab label="Subject 4">
        <TextInput source="subject4[name]" label="" />
        <TextInput source="subject4.code" label="Subject 4 Code" />
        <NumberInput source="subject4.cie1" label="CIE 1" />
        <NumberInput source="subject4.cie2" label="CIE 2" />
        <NumberInput source="subject4.cie3" label="CIE 3" />
        <NumberInput source="subject4.sem" label="Final" />
      </FormTab>
      <FormTab label="Subject 5">
        <TextInput source="subject5[name]" label="" />
        <TextInput source="subject5.code" label="Subject 5 Code" />
        <NumberInput source="subject5.cie1" label="CIE 1" />
        <NumberInput source="subject5.cie2" label="CIE 2" />
        <NumberInput source="subject5.cie3" label="CIE 3" />
        <NumberInput source="subject5.sem" label="Final" />
      </FormTab>
    </TabbedForm>
  </Create>
);
const StudentShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Subject 1">
        <TextField source="subject1[name]" label="" />
        <TextField source="subject1.code" label="Subject 1 Code" />
        <NumberField source="subject1.cie1" label="CIE 1" />
        <NumberField source="subject1.cie2" label="CIE 2" />
        <NumberField source="subject1.cie3" label="CIE 3" />
        <NumberField source="subject1.sem" label="Final" />
      </Tab>
      <Tab label="Subject 2">
        <TextField source="subject2[name]" label="" />
        <TextField source="subject2.code" label="Subject 2 Code" />
        <NumberField source="subject2.cie1" label="CIE 1" />
        <NumberField source="subject2.cie2" label="CIE 2" />
        <NumberField source="subject2.cie3" label="CIE 3" />
        <NumberField source="subject2.sem" label="Final" />
      </Tab>
      <Tab label="Subject 3">
        <TextField source="subject3[name]" label="" />
        <TextField source="subject3.code" label="Subject 3 Code" />
        <NumberField source="subject3.cie1" label="CIE 1" />
        <NumberField source="subject3.cie2" label="CIE 2" />
        <NumberField source="subject3.cie3" label="CIE 3" />
        <NumberField source="subject3.sem" label="Final" />
      </Tab>
      <Tab label="Subject 4">
        <TextField source="subject4[name]" label="" />
        <TextField source="subject4.code" label="Subject 4 Code" />
        <NumberField source="subject4.cie1" label="CIE 1" />
        <NumberField source="subject4.cie2" label="CIE 2" />
        <NumberField source="subject4.cie3" label="CIE 3" />
        <NumberField source="subject4.sem" label="Final" />
      </Tab>
      <Tab label="Subject 5">
        <TextField source="subject5[name]" label="" />
        <TextField source="subject5.code" label="Subject 5 Code" />
        <NumberField source="subject5.cie1" label="CIE 1" />
        <NumberField source="subject5.cie2" label="CIE 2" />
        <NumberField source="subject5.cie3" label="CIE 3" />
        <NumberField source="subject5.sem" label="Final" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);


export { StudentList, StudentEdit, StudentCreate, StudentShow };
