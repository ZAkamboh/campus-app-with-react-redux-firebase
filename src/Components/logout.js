import React from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { AppAction } from "../store/action";
class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.LogOut();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.logOutSuccess === true) {
      this.props.history.push("/");
    }
  }
  render() {
    return <div />;
  }
}
const mapStateToProps = state => {
  return {
    logOutSuccess: state.AppReducer.logOutSuccess
  };
};
const mapDispatchToProps = dispatch => {
  return {
    LogOut: () => dispatch(AppAction.LogOut())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
