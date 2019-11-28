import React, { Fragment } from "react";

import { Datagrid, List, NumberField } from "react-admin";

import Button from "@material-ui/core/Button";

// import MobileGrid from "./MobileGrid";

class SubjectBands extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "1"
    };
  }

  render() {
    console.log("shitzz");
    return (
      <div>
        <Button
          onClick={function() {
            this.setState({
              subject: "1"
            });
          }.bind(this)}
        >
          Subject 1
        </Button>
        <Button
          onClick={function() {
            this.setState({
              subject: "2"
            });
          }.bind(this)}
        >
          Subject 2
        </Button>
        <Button
          onClick={function() {
            this.setState({
              subject: "3"
            });
          }.bind(this)}
        >
          Subject 3
        </Button>
        <Button
          onClick={function() {
            this.setState({
              subject: "4"
            });
          }.bind(this)}
        >
          Subject 4
        </Button>
        <Button
          onClick={function() {
            this.setState({
              subject: "5"
            });
          }.bind(this)}
          s
        >
          Subject 5
        </Button>
        <List {...this.props}>
          <Datagrid {...this.props}>
            <NumberField
              source={"subject" + this.state.subject + ".name"}
              label="Red Band"
            />
            <NumberField
              source={"subject" + this.state.subject + ".yellow_band"}
              label="Yellow Band"
            />
            <NumberField
              source={"subject" + this.state.subject + ".green_band"}
              label="Green Band"
            />
          </Datagrid>
        </List>
      </div>
    );
  }
}

export default SubjectBands;
