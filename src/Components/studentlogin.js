import React, { Component } from "react";
import firebase from "../firebase/firebase";
class Studentlogin extends Component {
  constructor() {
    super();
    this.state = {
      studentemail: "",
      password: ""
    };
  }
  emaill(e) {
    this.setState({ studentemail: e.target.value });
  }
  passwordd(e) {
    this.setState({ password: e.target.value });
  }

  userlogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.studentemail, this.state.password)
      .then(res => {
        firebase
          .database()
          .ref(`studentprofile/${res.uid}`)
          .on("value", snap => {
            localStorage.setItem("studentprofile", JSON.stringify(snap.val()));
          });
        res["type"] = "Student";
        console.log(res);
        localStorage.setItem("studentlogin", JSON.stringify(res));
        this.props.history.push("/studentprofile");
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
            <input
              type="text"
              style={{ width: "400px", marginTop: "30px" }}
              onChange={this.emaill.bind(this)}
              className="form-control"
              placeholder=" Student Email"
              required
            />
            <br />
            <input
              type="password"
              style={{ width: "400px", marginTop: "20px" }}
              onChange={this.passwordd.bind(this)}
              className="form-control"
              placeholder="Password"
              required
            />
            <br />
            <button
              className="alert alert-danger"
              id="login"
              onClick={this.userlogin.bind(this)}
              style={styling}
            >
              Login
            </button>
            <div id="pleasewait" />
            <p>
              Do Not Have Account?
              <a href="/studentsignup">Sign Up</a>
            </p>
          </div>
        </center>
      </div>
    );
  }
}

export default Studentlogin;
