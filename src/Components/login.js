import React, { Component } from "react";
import firebase from "../firebase/firebase";
import { connect } from "react-redux";
import { AppAction } from "../store/action";
import AppReducer from "../store/reducer/appreducer";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      type: ""
    };
  }
  componentWillMount() {
    //this.props.clear();
  }
  emaill(e) {
    this.setState({ email: e.target.value });
  }
  passwordd(e) {
    this.setState({ password: e.target.value });
  }

  userlogin() {
    var logindata = {
      email: this.state.email,
      password: this.state.password,
      type: this.state.type
    };

    this.props.login(logindata);
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
              onChange={event =>
                this.setState({
                  type: event.target.value
                })
              }
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
              <a href="/studentsignup">Sign Up</a>
            </p>
          </div>
        </center>
        {this.props.studentlogin && this.props.history.push("/studentprofile")}
        {this.props.companylogin && this.props.history.push("/companyprofile")}
      </div>
    );
  }
}

function mapState(state) {
  return {
    companylogin: state.AppReducer.companylogin,
    studentlogin: state.AppReducer.studentlogin
  };
}

function mapDispatch(dispatch) {
  return {
    login: payload => {
      dispatch(AppAction.login(payload));
    },
    clear: () => {
      dispatch(AppAction.clear());
    }
  };
}
export default connect(
  mapState,
  mapDispatch
)(Login);
