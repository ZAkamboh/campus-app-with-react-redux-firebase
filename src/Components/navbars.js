import React, { Component } from "react";

// import "./App.css";
import createBrowserHistory from "history/createBrowserHistory";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AppAction } from "../store/action";
const customHistory = createBrowserHistory();

class Navbars extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }
  componentWillMount() {
    this.props.getUserfromRedux();
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
        {this.props.user && (
          <nav className="navbar navbar-inverse bg-primary">
            <div className="navbar nabar-right">
              <Link className="navbar navbar-content" style={styling} to="/">
                Home
              </Link>
              {this.props.user.type === "company" ? (
                <div className="navbar nabar-right">
                  {this.props.user.username}
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
                </div>
              ) : (
                <div className="navbar nabar-right">
                  <Link
                    className="navbar navbar-content"
                    style={student}
                    to="/studentprofile"
                  >
                    Student profile
                  </Link>
                  <Link
                    className="navbar navbar-content"
                    style={s}
                    to="/vacancies"
                  >
                    Vacancies
                  </Link>
                </div>
              )}
              <Link
                className="navbar navbar-content"
                style={styling}
                to="/logout"
              >
                Logout
              </Link>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.AppReducer.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserfromRedux: () => dispatch(AppAction.getUserfromRedux())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbars);
