import React, { Component } from "react";
import firebase from "../firebase/firebase";
class Studentsignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "student",
      name: "",
      email: "",
      password: "",
      contactnumber: "",
      collegename: "",
      gpa: "",
      skills: "",
      cpassword: ""
    };
  }

  usersignup() {
    if (this.state.type === "student") {
      if (this.state.password === this.state.cpassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(response => {
            const studentdetails = {
              studentname: this.state.name,
              studentemail: this.state.email,
              contactnumber: this.state.contactnumber,
              collegename: this.state.collegename,
              gpa: this.state.gpa,
              skills: this.state.skills,
              type: this.state.type,
              uid: response.uid
            };
            firebase
              .database()
              .ref(`studentprofile/${response.uid}`)
              .set(studentdetails);
            this.props.history.push("/login");
          })
          .catch(error => {
            alert(error.message);
          });
      }
    } else {
      const userdetails = {
        username: this.state.name,
        email: this.state.email,
        contactNumber: this.state.contactnumber,
        type: this.state.type
      };
      if (this.state.password === this.state.cpassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(response => {
            firebase
              .database()
              .ref(`companyprofile/${response.uid}`)
              .set(userdetails);
            this.props.history.push("/login");
          })
          .catch(error => {
            alert(error.message);
          });
      }
    }
  }
  handleChange(event) {
    this.setState({ type: event.target.value });
  }
  render() {
    return (
      <div>
        <center style={{ marginTop: "30px" }}>
          <h4 style={{ marginTop: "50px" }}>Sign Up To Get Start</h4>
          <hr />
          <div id="error" />
          <select
            onChange={this.handleChange.bind(this)}
            class="form-control"
            style={{ width: "400px" }}
            placeholder="Select Account Type"
          >
            <option disabled>Select Account Type</option>
            <option value="student">Student</option>
            <option value="company"> Company</option>
            <option value="admin"> ADMIN</option>
          </select>
          {this.state.type === "student" ? (
            <div>
              <input
                type="text"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event => {
                  this.setState({ name: event.target.value });
                }}
                placeholder="student name"
              />
              <input
                type="email"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event => {
                  this.setState({ email: event.target.value });
                }}
                placeholder="student Email"
              />
              <input
                type="text"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event => {
                  this.setState({ contactnumber: event.target.value });
                }}
                placeholder="Contact Number"
              />
              <input
                type="text"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event => {
                  this.setState({ collegename: event.target.value });
                }}
                placeholder="college name"
              />
              <input
                type="text"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event => {
                  this.setState({ gpa: event.target.value });
                }}
                placeholder="Gpa"
              />
              <input
                type="text"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event => {
                  this.setState({ skills: event.target.value });
                }}
                placeholder="Skills"
              />
              <input
                type="password"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event => {
                  this.setState({ password: event.target.value });
                }}
                placeholder="Password"
              />
              <input
                type="password"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event => {
                  this.setState({ cpassword: event.target.value });
                }}
                placeholder="ConfirmPassword"
              />
            </div>
          ) : (
            <div>
              <input
                type="text"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event => this.setState({ name: event.target.value })}
                placeholder="company name"
              />
              <input
                type="email"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event => this.setState({ email: event.target.value })}
                placeholder=" company Email"
              />
              <input
                type="text"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event => {
                  this.setState({ contactnumber: event.target.value });
                }}
                placeholder="Contact Number"
              />
              <input
                type="password"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
                placeholder="Password"
              />
              <input
                type="password"
                style={{ marginTop: "30px", width: "400px" }}
                className="form-control"
                onChange={event =>
                  this.setState({ cpassword: event.target.value })
                }
                placeholder="ConfirmPassword"
              />
            </div>
          )}

          <button
            style={{ marginTop: "30px" }}
            className="btn btn-success"
            onClick={this.usersignup.bind(this)}
          >
            Sign Up
          </button>
          <div id="redirect" />
        </center>
      </div>
    );
  }
}

export default Studentsignup;
