import React, { Component } from "react";
import firebase from "../firebase/firebase";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      cpassword: "",
      contactNumber: ""
    };
  }

  usernamee(e) {
    this.setState({ username: e.target.value });
  }

  emaill(e) {
    this.setState({ email: e.target.value });
  }
  passwordd(e) {
    this.setState({ password: e.target.value });
  }
  cpasswordd(e) {
    this.setState({ cpassword: e.target.value });
  }

  usersignup() {
    const userdetails = {
      username: this.state.username,
      email: this.state.email,
      contactNumber: this.state.contactNumber
    };
    if (this.password === this.cpassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
          //firebase.database.ref(`Students/${response.uid}`).set(userdetails);
          this.props.history.push("/login");
        })
        .catch(error => {
          alert(error.message);
        });
    } else {
      this.error.innerHTML =
        "<div class='alert alert-danger' style='width:500px'>Please confirm Your password</div>";
    }
  }
  render() {
    return (
      <div>
        <center style={{ marginTop: "30px" }}>
          <h4 style={{ marginTop: "50px" }}>Sign Up To Get Start</h4>
          <hr />
          <div id="error" />
          <input
            type="text"
            style={{ marginTop: "30px", width: "400px" }}
            className="form-control"
            onChange={this.usernamee.bind(this)}
            placeholder="Username"
          />
          <input
            type="email"
            style={{ marginTop: "30px", width: "400px" }}
            className="form-control"
            onChange={this.emaill.bind(this)}
            placeholder="Email"
          />
          <input
            type="password"
            style={{ marginTop: "30px", width: "400px" }}
            className="form-control"
            onChange={this.passwordd.bind(this)}
            placeholder="Password"
          />
          <input
            type="password"
            style={{ marginTop: "30px", width: "400px" }}
            className="form-control"
            onChange={this.cpasswordd.bind(this)}
            placeholder="ConfirmPassword"
          />
          <input
            type="text"
            style={{ marginTop: "30px", width: "400px" }}
            className="form-control"
            onChange={event => {
              this.setState({ contactNumber: event.target.value });
            }}
            placeholder="Contact Number"
          />
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

export default Signup;
