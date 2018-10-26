import React, { Component } from "react";
import Mopt from "./moption.js";
import { Link } from "react-router-dom";
import firebase from "../firebase/firebase";
import { Redirect } from "react-router-dom";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      id: "",
      email: "",
      address: "",
      phone: ""
    };
  }
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.props.history.push("/login");
    }
  }
  usernamee(e) {
    this.setState({ name: e.target.value });
  }
  idd(e) {
    this.setState({ id: e.target.value });
  }

  emaill(e) {
    this.setState({ email: e.target.value });
  }
  addresss(e) {
    this.setState({ address: e.target.value });
  }

  phoneno(e) {
    this.setState({ phone: e.target.value });
  }

  createuser() {
    var userdata = {
      name: this.state.name,
      id: this.state.id,
      email: this.state.email,

      address: this.state.address,
      phone: this.state.phone
    };
    var user = JSON.parse(localStorage.getItem("user"));
    var uid = user && user.uid;

    firebase
      .database()
      .ref(`student_detail/${uid}`)
      .push(userdata)
      .then(response => {
        //     //console.log("successfully create");
        //     // window.location = "/find";
        //     //return <Redirect to="/find" />;
        this.props.history.push("/find");
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
              onChange={this.usernamee.bind(this)}
              type="text"
              style={styles}
              className="form-control"
              placeholder="Student Name"
              required
            />
          </div>
          <div style={styling} className="form-group">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user" />
            </span>
            <input
              onChange={this.idd.bind(this)}
              type="text"
              style={styles}
              className="form-control"
              placeholder="Student Id"
              required
            />
          </div>
          <div style={styling} className="form-group">
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user" />
            </span>
            <input
              onChange={this.emaill.bind(this)}
              type="text"
              style={styles}
              className="form-control"
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group" style={styling}>
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-user" />
            </span>
            <input
              onChange={this.addresss.bind(this)}
              type="text"
              style={styles}
              className="form-control"
              placeholder="Address"
              required
            />
          </div>

          <div className="form-group" style={styling}>
            <span className="input-group-addon">
              <i className="glyphicon glyphicon-lock" />
            </span>
            <input
              onChange={this.phoneno.bind(this)}
              type="text"
              style={styles}
              className="form-control"
              placeholder="Phone Number"
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
