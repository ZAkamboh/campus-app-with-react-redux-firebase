import React, { Component } from "react";

import "./App.css";
import createBrowserHistory from "history/createBrowserHistory";
import { Router, Link, Route } from "react-router-dom";
import Signup from "./Components/signup";
import Login from "./Components/login";
import Myapp from "./Components/myapp";
import Create from "./Components/createrecord";
import Find from "./Components/finddata";
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
    return (
      <Router history={customHistory}>
        <div>
          <nav className="navbar navbar-inverse bg-primary">
            <div className="navbar nabar-right">
              <Link
                className="navbar navbar-content"
                style={styling}
                to="/create"
              >
                Create
              </Link>
              <Link
                className="navbar navbar-content"
                style={styling}
                to="/find"
              >
                Find
              </Link>
              <Link
                className="navbar navbar-content"
                style={styling}
                to="/myapp"
              >
                Myapp
              </Link>
              <Link
                className="navbar navbar-content"
                style={styling}
                to="/logout"
              >
                Logout
              </Link>
            </div>
          </nav>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/myapp" component={Myapp} />
          <Route path="/create" component={Create} />
          <Route path="/find" component={Find} />
          <Route path="/edit" component={Edit} />
          <Route path="/logout" component={Logout} />
        </div>
      </Router>
    );
  }
}

export default App;
