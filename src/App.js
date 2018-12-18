import React, { Component } from "react";

import "./App.css";
import createBrowserHistory from "history/createBrowserHistory";
import { Router, Link, Route } from "react-router-dom";

import Login from "./Components/login";
//company work
import Create from "./Components/companypostvacancy";
import Find from "./Components/companypostedvacancy";
import Companyprofile from "./Components/companyprofile";
import Appliedstudents from "./Components/appliedstudents";
// student work

import Studentsignup from "./Components/studentsignup";
import Vacancies from "./Components/vacancies";
import Studentprofile from "./Components/studentprofile";
import Home from "./Components/home";
import Edit from "./Components/edit";
import firebase from "firebase";
import Logout from "./Components/logout";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import { AppAction } from "./store/action";
import store from "./store";
import NavBars from "./Components/navbars";
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
      <div>
        <Provider store={store}>
          <Router history={customHistory}>
            <div>
              <NavBars />
              <Route exact path="/" component={Home} />

              <Route path="/login" component={Login} />
              <Route path="/studentsignup" component={Studentsignup} />

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
        </Provider>
      </div>
    );
  }
}
export default App;
