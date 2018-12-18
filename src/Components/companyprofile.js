import React, { Component } from "react";
import { connect } from "react-redux";
import { AppAction } from "../store/action";

class Companyprofile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {}
    };
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("companyprofile"));
    if (!user) {
      alert("if you are company so login first");
      this.props.history.push("/");
    } else {
      this.props.companyP();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.companypro) {
      this.setState({ profile: nextProps.companypro }, () => {});
    }
  }

  render() {
    return (
      <div>
        <h1>company profile</h1>
        <table className="table table-bordered table-hover table-striped">
          <tr>
            <td>company name </td>
            <td>company email </td>
            <td> contact number</td>
          </tr>
          {this.state.profile && (
            <tr>
              <td> {this.state.profile.username} </td>
              <td> {this.state.profile.email} </td>
              <td> {this.state.profile.contactNumber}</td>
            </tr>
          )}
        </table>
      </div>
    );
  }
}

function mapState(state) {
  console.log("www", state.AppReducer.companypro);
  return {
    companypro: state.AppReducer.companypro
  };
}
function mapDispatch(dispatch) {
  return {
    companyP: () => {
      dispatch(AppAction.companyP());
    }
  };
}

export default connect(
  mapState,
  mapDispatch
)(Companyprofile);
