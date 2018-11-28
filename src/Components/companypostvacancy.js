import React, { Component } from "react";
import Mopt from "./moption.js";
import { Link } from "react-router-dom";
import firebase from "../firebase/firebase";
import { Redirect } from "react-router-dom";

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
    const user = JSON.parse(localStorage.getItem("user"));
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
    var user = JSON.parse(localStorage.getItem("user"));
    var uid = user && user.uid;

    var companyvacancy = {
      vacancy: this.state.vacancy,
      companyname: this.state.companyname,
      companyemail: this.state.companyemail,

      companyno: this.state.companyno,
      qualification: this.state.qualification,
      salary: this.state.salary,
      companyUid: uid
    };
    //console.log(companyvacancy);
    firebase
      .database()
      .ref(`companyvacancyy`)
      .push(companyvacancy)
      .then(response => {
        //     //console.log("successfully create");
        //     // window.location = "/find";
        //     //return <Redirect to="/find" />;
        this.props.history.push("/mypostedvacancies");
      })
      .catch(error => {
        console.log(error.message);
      });
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

          <div id="pleasewait" style={{ marginTop: "30px" }} />
        </center>
      </div>
    );
  }
}

export default Create;
