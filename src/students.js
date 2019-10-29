// in src/students.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  Tab,
  DisabledInput,
  SimpleShowLayout,
  TabbedShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  SelectInput,
  DateInput,
  NumberField,
  DateField,
  EmailField,
  ReferenceManyField,
  SingleFieldList,
  ChipField,
  ReferenceInput,
  AutocompleteInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const ExpandSubjectsPanel = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Subject 1">
        <TextField source="subject1[1]" label="Subject 1 Code" />
        <TextField source="subject1[2]" label="CIE 1" />
        <TextField source="subject1[3]" label="CIE 2" />
        <TextField source="subject1[4]" label="CIE 3" />
        <TextField source="subject1[5]" label="Final" />
      </Tab>
      <Tab label="Subject 2">
        <TextField source="subject2[1]" label="Subject 2 Code" />
        <TextField source="subject2[2]" label="CIE 1" />
        <TextField source="subject2[3]" label="CIE 2" />
        <TextField source="subject2[4]" label="CIE 3" />
        <TextField source="subject2[5]" label="Final" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

const StudentList = props => (
  <List {...props}>
    <Datagrid rowClick="edit" expand={<ExpandSubjectsPanel />}>
      <TextField source="batch" />
      <TextField source="name" />
      <TextField source="usn" label="USN" />
      <TextField source="subject1[0]" label="Subject 1" />
      <TextField source="subject2[0]" label="Subject 2" />
      <TextField source="subject3[0]" label="Subject 3" />
      <TextField source="subject4[0]" label="Subject 4" />
      <TextField source="subject5[0]" label="Subject 5" />
      <EditButton />
    </Datagrid>
  </List>
);

const StudentEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="academic year" />
      <TextInput source="admission number" />
      <TextInput source="address" />
      <TextInput source="city" />
      <TextInput source="class" />
      <TextInput source="country" />
      <TextInput source="department" />
      <DateInput source="dob" />
      <TextInput source="doj" />
      <TextInput source="gender" />
      <TextInput source="location" />
      <TextInput source="name" />
      <TextInput source="phone" />
      <TextInput source="pincode" />
    </SimpleForm>
  </Edit>
);
const StudentCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="admission number" />
      <TextInput source="Location" />
      <DateInput source="academicYear" />
      <TextInput source="address" />
      <TextInput source="city" />
      <TextInput source="class" />
      <TextInput source="country" />
      <DateInput source="dateOfJoining" />
      <TextInput source="department" />
      <TextInput source="dob" />
      <TextInput source="gender" />
      <TextInput source="name" />
      <TextInput source="pincode" />
      <TextInput source="profilePhoto" />
    </SimpleForm>
  </Create>
);
const StudentShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Student Info">
        <TextField source="admission number" />
        <TextField source="name" />
        <TextField source="gender" />
        <TextField source="class" />
        <TextField source="department" />
        <TextField source="Location" />
        <TextField source="academicYear" />
        <TextField source="address" />
        <TextField source="city" />
        <TextField source="country" />
        <TextField source="dateOfJoining" />
        <TextField source="dob" label="Date of Birth" />
        <TextField source="pincode" />
        <TextField source="profilePhoto" />
      </Tab>

      <Tab label="Parent Info">
        <ReferenceManyField
          label="Parent"
          reference="parents"
          target="admission number"
        >
          <SingleFieldList>
            <TextField source="pname" />
          </SingleFieldList>
        </ReferenceManyField>
        <ReferenceManyField
          label="Profession"
          reference="parents"
          target="admission number"
        >
          <SingleFieldList>
            <TextField source="profession" />
          </SingleFieldList>
        </ReferenceManyField>
        <ReferenceManyField
          label="Email"
          reference="parents"
          target="admission number"
        >
          <SingleFieldList>
            <TextField source="email" />
          </SingleFieldList>
        </ReferenceManyField>
        <ReferenceManyField
          label="Phone"
          reference="parents"
          target="admission number"
        >
          <SingleFieldList>
            <TextField source="phone" />
          </SingleFieldList>
        </ReferenceManyField>
        <ReferenceManyField
          label="Relationship"
          reference="parents"
          target="admission number"
        >
          <SingleFieldList>
            <TextField source="relationship" />
          </SingleFieldList>
        </ReferenceManyField>
        <ReferenceManyField
          label="Date of Birth"
          reference="parents"
          target="admission number"
        >
          <SingleFieldList>
            <TextField source="dob" />
          </SingleFieldList>
        </ReferenceManyField>
        <ReferenceManyField
          label="Blood Group"
          reference="parents"
          target="admission number"
        >
          <SingleFieldList>
            <TextField source="blood group" />
          </SingleFieldList>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export { StudentList, StudentEdit, StudentCreate, StudentShow };
