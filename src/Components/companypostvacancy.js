import React, { Component } from "react";
import Mopt from "./moption.js";
import { Link } from "react-router-dom";
import firebase from "../firebase/firebase";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppAction } from "../store/action";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      vacancy: "",
      companyname: "",
      companyemail: "",
      companyno: "",
      qualification: "",
      salary: ""
    };
  }
  componentWillMount() {
    this.props.clear();
    const user = JSON.parse(localStorage.getItem("companyprofile"));
    if (!user) {
      alert("if you are company so login first");
      this.props.history.push("/");
    }
  }
  vacancy(e) {
    this.setState({ vacancy: e.target.value });
  }
  companyname(e) {
    this.setState({ companyname: e.target.value });
  }

  email(e) {
    this.setState({ companyemail: e.target.value });
  }
  number(e) {
    this.setState({ companyno: e.target.value });
  }

  qualification(e) {
    this.setState({ qualification: e.target.value });
  }
  salary(e) {
    this.setState({ salary: e.target.value });
  }

  createuser() {
    var user = JSON.parse(localStorage.getItem("profile"));
    var uid = user && user.uid;
    alert(uid);

    var companyvacancy = {
      vacancy: this.state.vacancy,
      companyname: this.state.companyname,
      companyemail: this.state.companyemail,

      companyno: this.state.companyno,
      qualification: this.state.qualification,
      salary: this.state.salary,
      companyUid: uid
    };
    this.props.createVacancy(companyvacancy);
  }

  render() {
    var styling = {
      marginTop: "30px"
    };
    var styles = {
      width: "600px"
    };
    return (
      <div>
        <center style={styling}>
          <hr />
          <h4 className="alert alert-success">Please Enter student details</h4>
          <div id="error" />
          <hr />
          <div id="errors" />

          <div style={styling} className="form-group">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user" />
            </span>
            <input
              onChange={this.vacancy.bind(this)}
              type="text"
              style={styles}
              className="form-control"
              placeholder="vacancy"
              required
            />
          </div>
          <div style={styling} className="form-group">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user" />
            </span>
            <input
              onChange={this.companyname.bind(this)}
              type="text"
              style={styles}
              className="form-control"
              placeholder="companyname"
              required
            />
          </div>
          <div style={styling} className="form-group">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user" />
            </span>
            <input
              onChange={this.email.bind(this)}
              type="email"
              style={styles}
              className="form-control"
              placeholder="Company Email"
              required
            />
          </div>

          <div className="form-group" style={styling}>
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user" />
            </span>
            <input
              onChange={this.number.bind(this)}
              type="text"
              style={styles}
              className="form-control"
              placeholder="company Number"
              required
            />
          </div>

          <div className="form-group" style={styling}>
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-lock" />
            </span>
            <input
              onChange={this.qualification.bind(this)}
              type="text"
              style={styles}
              className="form-control"
              placeholder="Qualification"
              required
            />
            <input
              onChange={this.salary.bind(this)}
              type="text"
              style={styles}
              className="form-control"
              placeholder="salary"
              required
            />
          </div>
          <div className="form-group" style={styling} />

          <button
            className="btn btn-info"
            style={styling}
            onClick={this.createuser.bind(this)}
          >
            Submit Details
          </button>
        </center>
        {this.props.createdSuccess &&
          this.props.history.push("/mypostedvacancies")}
      </div>
    );
  }
}
function mapState(state) {
  console.log(state.AppReducer);
  return {
    name: state.AppReducer.name,
    createdSuccess: state.AppReducer.createdSuccess
  };
}
function mapDispatch(dispatch) {
  return {
    butt: payload => {
      dispatch(AppAction.button(payload));
    },
    createVacancy: payload => {
      dispatch(AppAction.createVacancy(payload));
    },
    clear: () => {
      dispatch(AppAction.clear());
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(Create);
