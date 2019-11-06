import * as React from "react";
import { Datagrid, List, TextField, NumberField, Tab, TabbedShowLayout, Show } from "react-admin";

export const SubjectResultList = props => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="Subject 1">
                <NumberField source="" label="CIE 1"/>
                <NumberField source="" label="CIE 2"/>
                <NumberField source="" label="CIE 3"/>
            </Tab>
            <Tab label="Subject 2">
                <NumberField source="" label="CIE 1"/>
                <NumberField source="" label="CIE 2"/>
                <NumberField source="" label="CIE 3"/>
            </Tab>
            <Tab label="Subject 3">
                <NumberField source="" label="CIE 1"/>
                <NumberField source="" label="CIE 2"/>
                <NumberField source="" label="CIE 3"/>
            </Tab>
            <Tab label="Subject 4">
                <NumberField source="" label="CIE 1"/>
                <NumberField source="" label="CIE 2"/>
                <NumberField source="" label="CIE 3"/>
            </Tab>
            <Tab label="Subject 5">
                <NumberField source="" label="CIE 1"/>
                <NumberField source="" label="CIE 2"/>
                <NumberField source="" label="CIE 3"/>
            </Tab>
        </TabbedShowLayout>
    </Show>
)