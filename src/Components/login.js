import React, { Component } from "react";
import firebase from "../firebase/firebase";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      type: ""
    };
  }
  emaill(e) {
    this.setState({ email: e.target.value });
  }
  passwordd(e) {
    this.setState({ password: e.target.value });
  }

  userlogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        if (this.state.type === "student") {
          firebase
            .database()
            .ref(`studentprofile/${res.uid}`)
            .on("value", snap => {
              localStorage.setItem(
                "studentprofile",
                JSON.stringify(snap.val())
              );
              //console.log(JSON.parse(localStorage.getItem("studentprofile")));
              this.props.history.push("/studentprofile");
            });
        } else {
          firebase
            .database()
            .ref(`companyprofile/${res.uid}`)
            .on("value", snap => {
              localStorage.setItem(
                "companyprofile",
                JSON.stringify(snap.val())
              );
            });
          localStorage.setItem("user", JSON.stringify(res));
          this.props.history.push("/companyprofile");
        }
      })
      .catch(error => {
        alert(error.message);
      });
  }
  render() {
    var styling = {
      marginTop: "50px"
    };

    return (
      <div>
        <center style={{ marginBottom: "100px" }}>
          <h4 style={styling}>Please Verify Yourself</h4>
          <div>
            <div id="error" style={styling} />
            <select
              onChange={event => this.setState({ type: event.target.value })}
              className="form-control"
              style={{ width: "400px" }}
            >
              <option>Select Login Type</option>
              <option value="student">Student</option>
              <option value="company">Company</option>
            </select>
            <input
              type="text"
              style={{ width: "400px", marginTop: "30px" }}
              onChange={this.emaill.bind(this)}
              className="form-control"
              placeholder="Email"
              required
              disabled={
                this.state.type === "student" || this.state.type === "company"
                  ? false
                  : true
              }
            />
            <br />
            <input
              type="password"
              style={{ width: "400px", marginTop: "20px" }}
              onChange={this.passwordd.bind(this)}
              className="form-control"
              placeholder="Password"
              required
              disabled={
                this.state.type === "student" || this.state.type === "company"
                  ? false
                  : true
              }
            />
            <br />
            <button
              className="alert alert-danger"
              id="login"
              onClick={this.userlogin.bind(this)}
              style={styling}
              disabled={
                this.state.type === "student" || this.state.type === "company"
                  ? false
                  : true
              }
            >
              Login
            </button>
            <div id="pleasewait" />
            <p>
              Do Not Have Account?
              <a href="/signup">Sign Up</a>
            </p>
          </div>
        </center>
      </div>
    );
  }
}

export default Login;
