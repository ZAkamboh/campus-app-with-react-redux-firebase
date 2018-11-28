import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
class Home extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.props.history.push("/find");
    } else {
      console.log("not found");
    }
  }
  render() {
    var styling = {
      marginTop: "50px",

      fontFamily: "algerian"
    };
    var sty = {
      color: "white"
    };
    var butt = {
      align: "center",
      fontSize: 30
    };
    return (
      <div>
        <center>
          <h1 style={styling}>Campus Recruitment System</h1>
          <br />
          <br />

          <button className="btn btn-danger">
            <Link style={sty} to="/login">
              Login
            </Link>
          </button>
          <br />
          <br />
          <br />
          <button className="btn btn-success">
            <Link style={sty} to="/studentsignup">
              Signup
            </Link>
          </button>
        </center>
      </div>
    );
  }
}

export default Home;
