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
      <TextField source="subject1[0]" label="Subject 1" />
      <TextField source="subject2[0]" label="Subject 2" />
      <TextField source="subject3[0]" label="Subject 3" />
      <TextField source="subject4[0]" label="Subject 4" />
      <TextField source="subject5[0]" label="Subject 5" />
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
        <TextInput source="subject1[0]" label="" />
        <TextInput source="subject1[1]" label="Subject 1 Code" />
        <NumberInput source="subject1[2]" label="CIE 1" />
        <NumberInput source="subject1[3]" label="CIE 2" />
        <NumberInput source="subject1[4]" label="CIE 3" />
        <NumberInput source="subject1[5]" label="Final" />
      </FormTab>
      <FormTab label="Subject 2">
        <TextInput source="subject2[0]" label="" />
        <TextInput source="subject2[1]" label="Subject 2 Code" />
        <NumberInput source="subject2[2]" label="CIE 1" />
        <NumberInput source="subject2[3]" label="CIE 2" />
        <NumberInput source="subject2[4]" label="CIE 3" />
        <NumberInput source="subject2[5]" label="Final" />
      </FormTab>
      <FormTab label="Subject 3">
        <TextInput source="subject3[0]" label="" />
        <TextInput source="subject3[1]" label="Subject 3 Code" />
        <NumberInput source="subject3[2]" label="CIE 1" />
        <NumberInput source="subject3[3]" label="CIE 2" />
        <NumberInput source="subject3[4]" label="CIE 3" />
        <NumberInput source="subject3[5]" label="Final" />
      </FormTab>
      <FormTab label="Subject 4">
        <TextInput source="subject4[0]" label="" />
        <TextInput source="subject4[1]" label="Subject 4 Code" />
        <NumberInput source="subject4[2]" label="CIE 1" />
        <NumberInput source="subject4[3]" label="CIE 2" />
        <NumberInput source="subject4[4]" label="CIE 3" />
        <NumberInput source="subject4[5]" label="Final" />
      </FormTab>
      <FormTab label="Subject 5">
        <TextInput source="subject5[0]" label="" />
        <TextInput source="subject5[1]" label="Subject 5 Code" />
        <NumberInput source="subject5[2]" label="CIE 1" />
        <NumberInput source="subject5[3]" label="CIE 2" />
        <NumberInput source="subject5[4]" label="CIE 3" />
        <NumberInput source="subject5[5]" label="Final" />
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
        <TextInput source="subject1[0]" label="" />
        <TextInput source="subject1[1]" label="Subject 1 Code" />
        <NumberInput source="subject1[2]" label="CIE 1" />
        <NumberInput source="subject1[3]" label="CIE 2" />
        <NumberInput source="subject1[4]" label="CIE 3" />
        <NumberInput source="subject1[5]" label="Final" />
      </FormTab>
      <FormTab label="Subject 2">
        <TextInput source="subject2[0]" label="" />
        <TextInput source="subject2[1]" label="Subject 2 Code" />
        <NumberInput source="subject2[2]" label="CIE 1" />
        <NumberInput source="subject2[3]" label="CIE 2" />
        <NumberInput source="subject2[4]" label="CIE 3" />
        <NumberInput source="subject2[5]" label="Final" />
      </FormTab>
      <FormTab label="Subject 3">
        <TextInput source="subject3[0]" label="" />
        <TextInput source="subject3[1]" label="Subject 3 Code" />
        <NumberInput source="subject3[2]" label="CIE 1" />
        <NumberInput source="subject3[3]" label="CIE 2" />
        <NumberInput source="subject3[4]" label="CIE 3" />
        <NumberInput source="subject3[5]" label="Final" />
      </FormTab>
      <FormTab label="Subject 4">
        <TextInput source="subject4[0]" label="" />
        <TextInput source="subject4[1]" label="Subject 4 Code" />
        <NumberInput source="subject4[2]" label="CIE 1" />
        <NumberInput source="subject4[3]" label="CIE 2" />
        <NumberInput source="subject4[4]" label="CIE 3" />
        <NumberInput source="subject4[5]" label="Final" />
      </FormTab>
      <FormTab label="Subject 5">
        <TextInput source="subject5[0]" label="" />
        <TextInput source="subject5[1]" label="Subject 5 Code" />
        <NumberInput source="subject5[2]" label="CIE 1" />
        <NumberInput source="subject5[3]" label="CIE 2" />
        <NumberInput source="subject5[4]" label="CIE 3" />
        <NumberInput source="subject5[5]" label="Final" />
      </FormTab>
    </TabbedForm>
  </Create>
);
const StudentShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Subject 1">
        <TextField source="subject1[0]" label="" />
        <TextField source="subject1[1]" label="Subject 1 Code" />
        <NumberField source="subject1[2]" label="CIE 1" />
        <NumberField source="subject1[3]" label="CIE 2" />
        <NumberField source="subject1[4]" label="CIE 3" />
        <NumberField source="subject1[5]" label="Final" />
      </Tab>
      <Tab label="Subject 2">
        <TextField source="subject2[0]" label="" />
        <TextField source="subject2[1]" label="Subject 2 Code" />
        <NumberField source="subject2[2]" label="CIE 1" />
        <NumberField source="subject2[3]" label="CIE 2" />
        <NumberField source="subject2[4]" label="CIE 3" />
        <NumberField source="subject2[5]" label="Final" />
      </Tab>
      <Tab label="Subject 3">
        <TextField source="subject3[0]" label="" />
        <TextField source="subject3[1]" label="Subject 3 Code" />
        <NumberField source="subject3[2]" label="CIE 1" />
        <NumberField source="subject3[3]" label="CIE 2" />
        <NumberField source="subject3[4]" label="CIE 3" />
        <NumberField source="subject3[5]" label="Final" />
      </Tab>
      <Tab label="Subject 4">
        <TextField source="subject4[0]" label="" />
        <TextField source="subject4[1]" label="Subject 4 Code" />
        <NumberField source="subject4[2]" label="CIE 1" />
        <NumberField source="subject4[3]" label="CIE 2" />
        <NumberField source="subject4[4]" label="CIE 3" />
        <NumberField source="subject4[5]" label="Final" />
      </Tab>
      <Tab label="Subject 5">
        <TextField source="subject5[0]" label="" />
        <TextField source="subject5[1]" label="Subject 5 Code" />
        <NumberField source="subject5[2]" label="CIE 1" />
        <NumberField source="subject5[3]" label="CIE 2" />
        <NumberField source="subject5[4]" label="CIE 3" />
        <NumberField source="subject5[5]" label="Final" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export { StudentList, StudentEdit, StudentCreate, StudentShow };
