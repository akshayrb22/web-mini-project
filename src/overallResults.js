import * as React from "react";
import { Datagrid, List, TextField, NumberField, Query } from "react-admin";


export const ResultsList = props => (
    <List {...props}>
        <Datagrid>
            {/* <NumberField source={0} label="Students Attempted"/> */}
            <NumberField source="pass_rate" label="Pass Percentage"/>
            <NumberField source="cie_min" label="CIE Minimum" />
            <NumberField source="cie_max" label="CIE Maximum" />
            <NumberField source="cie_avg" label="CIE Average" />
            <NumberField source="sem_min" label="Sem Minimum" />
            <NumberField source="sem_max" label="Sem Maximum" />
            <NumberField source="sem_avg" label="Sem Average" />
            <NumberField source="final_min" label="Final Minimum" />
            <NumberField source="final_max" label="Final Maximum" />
            <NumberField source="final_avg" label="Final Average" />
        </Datagrid>
    </List>
);
