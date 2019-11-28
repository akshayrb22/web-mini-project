import * as React from "react";

import { Datagrid, List, NumberField, TextField } from "react-admin";

export const SubjectList = props => (
	<List {...props}>
		<Datagrid>
			<TextField source="name" label="Exam Type" />
			<TextField source="subject1.name" label="Subject Name" />
			<NumberField source="subject1.red_band" label="Red Band" />
			<NumberField source="subject1.yellow_band" label="Yellow Band" />
			<NumberField source="subject1.green_band" label="Green Band" />
		</Datagrid>
	</List>
);
