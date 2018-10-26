import React from "react";
import firebase from "firebase";

export default class Logout extends React.Component {
  componentWillMount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("user");
        this.props.history.push("/login");
      });
  }
  render() {
    return <div />;
  }
}
