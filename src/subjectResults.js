// import * as React from "react";
// import {
// 	Datagrid,
// 	List,
// 	TextField,
// 	NumberField,
// 	Tab,
// 	TabbedShowLayout,
// 	Show,
// 	ReferenceManyField
// } from "react-admin";

// export const SubjectResultList = props => (
// 	<Show {...props}>
// 		<TabbedShowLayout>
// 			<Tab label="Subject 1">
// 				<ReferenceManyField reference="" target="" >
// 					<Datagrid>
// 						<NumberField source="subject1/sub1-collection/CIE1" label="CIE 1" />
// 						<NumberField source="subject1/sub1-collection/CIE2" label="CIE 2" />
// 						<NumberField source="subject1/sub1-collection/CIE3" label="Green Band" />
// 						<NumberField source="subject1/sub1-collection/SemEnd" label="Semester End" />
// 						<NumberField source="subject1/sub1-collection/Final" label="Final" />
// 					</Datagrid>
// 				</ReferenceManyField>
// 			</Tab>
// 			<Tab label="Subject 2">
// 				<ReferenceManyField reference="" target="" >
// 					<Datagrid>
// 						<NumberField source="subject2/sub2-collection/CIE1" label="CIE 1" />
// 						<NumberField source="subject2/sub2-collection/CIE2" label="CIE 2" />
// 						<NumberField source="subject2/sub2-collection/CIE3" label="CIE 3" />
// 						<NumberField source="subject2/sub2-collection/SemEnd" label="Semester End"/>
// 						<NumberField source="subject2/sub2-collection/Final" label="Final" />
// 					</Datagrid>
// 				</ReferenceManyField>
// 			</Tab>
// 			<Tab label="Subject 3">
// 				<ReferenceManyField reference="" target="" >
// 					<Datagrid>
// 						<NumberField source="subject3/sub3-collection/CIE1" label="CIE 1" />
// 						<NumberField source="subject3/sub3-collection/CIE2" label="CIE 2" />
// 						<NumberField source="subject3/sub3-collection/CIE3" label="CIE 3" />
// 						<NumberField source="subject3/sub3-collection/SemEnd" label="Semester End" />
// 						<NumberField source="subject3/sub3-collection/Final" label="Final" />
// 					</Datagrid>
// 				</ReferenceManyField>
// 			</Tab>
// 			<Tab label="Subject 4">
// 				<ReferenceManyField reference="" target="" >
// 					<Datagrid>
// 						<NumberField source="subject4/sub4-collection/CIE1" label="CIE 1" />
// 						<NumberField source="subject4/sub4-collection/CIE2" label="CIE 2" />
// 						<NumberField source="subject4/sub4-collection/CIE3" label="CIE 3" />
// 						<NumberField source="subject4/sub4-collection/SemEnd" label="Semester End" />
// 						<NumberField
// 							source="subject4/sub4-collection/Final"
// 							label="Final"
// 						/>
// 					</Datagrid>
// 				</ReferenceManyField>
// 			</Tab>
// 			<Tab label="Subject 5">
// 				<ReferenceManyField reference="" target="" >
// 					<Datagrid>
// 						<NumberField source="subject5/sub5-collection/CIE1" label="CIE 1" />
// 						<NumberField source="subject5/sub5-collection/CIE2" label="CIE 2" />
// 						<NumberField source="subject5/sub5-collection/CIE3" label="CIE 3" />
// 						<NumberField source="subject5/sub5-collection/SemEnd" label="Semester End"/>
// 						<NumberField source="subject5/sub5-collection/Final" label="Final"/>
// 					</Datagrid>
// 				</ReferenceManyField>
// 			</Tab>
// 		</TabbedShowLayout>
// 	</Show>
// );
import React, { Fragment } from "react";
import { Datagrid, List, NumberField, Responsive } from "react-admin";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// import MobileGrid from "./MobileGrid";

class TabbedDatagrid extends React.Component {
	tabs = [
		{ id: "subject1", name: "subject1" },
		{ id: "subject2", name: "subject2" },
		{ id: "subject3", name: "subject3" },
		{ id: "subject4", name: "subject4" },
		{ id: "subject5", name: "subject5" }
	];

	state = {
		subject1: [],
		subject2: [],
		subject3: [],
		subject4: [],
		subject5: []
	};

	static getDerivedStateFromProps(props, state) {
		if (props.ids !== state[props.filterValues.status]) {
			return { ...state, [props.filterValues.status]: props.ids };
		}
		return null;
	}

	handleChange = (event, value) => {
		const { filterValues, setFilters } = this.props;
		setFilters({ ...filterValues, status: value });
	};

	render() {
		const { classes, filterValues, ...props } = this.props;
		return (
			<Fragment>
				<Tabs
					fullWidth
					centered
					value={filterValues.status}
					indicatorColor="primary"
					onChange={this.handleChange}
				>
					{this.tabs.map(choice => (
						<Tab key={choice.id} label={choice.name} value={choice.id} />
					))}
				</Tabs>
				<Divider />
				<Responsive
					medium={
						<div>
							{filterValues.status === "subject1" && (
								<Datagrid {...props} ids={this.state["subject1"]}>
									<NumberField
										source="subject1.red_band"
										label="Red Band"
									/>
									<NumberField
										source="subject1.yellow_band"
										label="Yellow Band"
									/>
									<NumberField
										source="subject1.green_band"
										label="Green Band"
									/>
								</Datagrid>
							)}
							{filterValues.status === "subject2" && (
								<Datagrid {...props} ids={this.state["subject2"]}>
									<NumberField
										source="subject2.red_band"
										label="Red Band"
									/>
									<NumberField
										source="subject2.yellow_band"
										label="Yellow Band"
									/>
									<NumberField
										source="subject2.green_band"
										label="Green Band"
									/>
								</Datagrid>
							)}
							{filterValues.status === "subject3" && (
								<Datagrid {...props} ids={this.state["subject3"]}>
									<NumberField
										source="subject3.red_band"
										label="Red Band"
									/>
									<NumberField
										source="subject3.yellow_band"
										label="Yellow Band"
									/>
									<NumberField
										source="subject3.green_band"
										label="Green Band"
									/>
								</Datagrid>
							)}
							{filterValues.status === "subject4" && (
								<Datagrid {...props} ids={this.state["subject4"]}>
									<NumberField
										source="subject4.red_band"
										label="Red Band"
									/>
									<NumberField
										source="subject4.yellow_band"
										label="Yellow Band"
									/>
									<NumberField
										source="subject4.green_band"
										label="Green Band"
									/>
								</Datagrid>
							)}
							{filterValues.status === "subject5" && (
								<Datagrid {...props} ids={this.state["subject5"]}>
									<NumberField
										source="subject5.red_band"
										label="Red Band"
									/>
									<NumberField
										source="subject5.yellow_band"
										label="Yellow Band"
									/>
									<NumberField
										source="subject5.green_band"
										label="Green Band"
									/>
								</Datagrid>
							)}
						</div>
					}
				/>
			</Fragment>
		);
	}
}

export const SubjectBands = ({ classes, ...props }) => (
	<List {...props} filterDefaultValues={{ status: "subject1" }} perPage={25}>
		<TabbedDatagrid />
	</List>
);

export default SubjectBands;
