import React, { Component } from "react";

import "./App.css";
import createBrowserHistory from "history/createBrowserHistory";
import { Router, Link, Route } from "react-router-dom";
import Signup from "./Components/signup";
import Login from "./Components/login";
//company work
import Create from "./Components/companypostvacancy";
import Find from "./Components/companypostedvacancy";
import Companyprofile from "./Components/companyprofile";
import Appliedstudents from "./Components/appliedstudents";
// student work
import Studentlogin from "./Components/studentlogin";
import Studentsignup from "./Components/studentsignup";
import Vacancies from "./Components/vacancies";
import Studentprofile from "./Components/studentprofile";
import Home from "./Components/home";
import Edit from "./Components/edit";
import firebase from "firebase";
import Logout from "./Components/logout";
const customHistory = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }
  render() {
    var styling = {
      color: "yellow",
      fontSize: "20px",
      fontFamily: "algerian"
    };
    var student = {
      color: "white",
      fontSize: "20px",
      fontFamily: "algerian",
      marginLeft: "100px"
    };
    var s = {
      color: "white",
      fontSize: "20px",
      fontFamily: "algerian"
    };
    return (
      <Router history={customHistory}>
        <div>
          <nav className="navbar navbar-inverse bg-primary">
            <div className="navbar nabar-right">
              <Link className="navbar navbar-content" style={styling} to="/">
                Home
              </Link>
              <Link
                className="navbar navbar-content"
                style={styling}
                to="/companyprofile"
              >
                Company profile
              </Link>
              <Link
                className="navbar navbar-content"
                style={styling}
                to="/postvacancy"
              >
                Post Vacancy
              </Link>
              <Link
                className="navbar navbar-content"
                style={styling}
                to="/mypostedvacancies"
              >
                My posted vacancies
              </Link>
              <Link
                className="navbar navbar-content"
                style={styling}
                to="/appliedstudents"
              />
              <Link
                className="navbar navbar-content"
                style={styling}
                to="/logout"
              >
                Logout
              </Link>

              <Link
                className="navbar navbar-content"
                style={student}
                to="/studentprofile"
              >
                Student profile
              </Link>
              <Link className="navbar navbar-content" style={s} to="/vacancies">
                Vacancies
              </Link>
            </div>
          </nav>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/studentsignup" component={Studentsignup} />
          <Route path="/studentlogin" component={Studentlogin} />
          <Route path="/postvacancy" component={Create} />
          <Route path="/mypostedvacancies" component={Find} />
          <Route path="/companyprofile" component={Companyprofile} />
          <Route path="/appliedstudents" component={Appliedstudents} />
          <Route path="/studentprofile" component={Studentprofile} />
          <Route path="/vacancies" component={Vacancies} />
          <Route path="/edit" component={Edit} />
          <Route path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}

export default App;
