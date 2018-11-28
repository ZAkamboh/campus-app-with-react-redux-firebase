import React, { Component } from "react";

class Companyprofile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {}
    };
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("if you are company so login first");
      this.props.history.push("/");
    }
  }
  componentDidMount() {
    const companyprofile = JSON.parse(localStorage.getItem("companyprofile"));
    this.setState({ profile: companyprofile }, () => {
      //console.log(this.state.profile);
    });
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

export default Companyprofile;
