import React from "react";
import firebase from "firebase";

export default class Logout extends React.Component {
  componentWillMount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("companyprofile");
        localStorage.removeItem("studentlogin");
        localStorage.removeItem("studentprofile");
        this.props.history.push("/");
      });
  }
  render() {
    return <div />;
  }
}
