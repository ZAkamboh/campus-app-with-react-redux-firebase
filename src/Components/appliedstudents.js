import React, { Component } from "react";
import firebase from "../firebase/firebase";

import { connect } from "react-redux";
import { AppAction } from "../store/action";
class Appliedstudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetched: false
    };
  }
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("companyprofile"));
    if (!user) {
      alert("if you are company so login first");
      this.props.history.push("/");
    } else {
      var vacancyId = this.props.location.state.data;
      this.props.applied(vacancyId);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.appliedStudents.length > 0) {
      this.setState(
        { data: nextProps.appliedStudents, fetched: true },
        () => {}
      );
    }
  }
  render() {
    return (
      <div>
        <center>
          <table className="table table-bordered table-hover table-striped">
            <tr>
              <td>student Name</td>
              <td>College Name</td>
              <td>Student Email</td>
              <td>Contact Number</td>
              <td>GPA</td>
              <td>Skills</td>
            </tr>
            {this.state.fetched === true ? (
              this.state.data.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.studentname}</td>
                    <td>{data.collegename}</td>
                    <td>{data.studentemail}</td>
                    <td>{data.contactnumber}</td>
                    <td>{data.gpa}</td>
                    <td>{data.skills}</td>
                  </tr>
                );
              })
            ) : (
              <center style={{ width: "100%" }}>
                <div className="loader" style={{ marginTop: "20%" }} />
              </center>
            )}
          </table>
        </center>
      </div>
    );
  }
}

function mapState(state) {
  return {
    appliedStudents: state.AppReducer.applied
  };
}
function mapDispatch(dispatch) {
  return {
    applied: payload => {
      dispatch(AppAction.applied(payload));
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(Appliedstudents);
