import React, { Component } from "react";
import firebase from "../firebase/firebase";
class Vacancies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      key: "",
      fetched: false,
      press: false
    };
  }
  componentWillMount() {
    const student = JSON.parse(localStorage.getItem("studentprofile"));
    if (!student) {
      alert("if you are student so login first");
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    var values = [];
    // var u = JSON.parse(localStorage.getItem("studentlogin"));
    // var uid = u && u.uid;
    //console.log(uid);
    firebase
      .database()
      .ref(`companyvacancyy`)
      .once("value", snap => {
        var data = snap.val();
        //var keys = Object.keys(data);
        for (let keys in data) {
          values.push({ ...data[keys], key: keys });
        }
        console.log(values);
        this.setState({ data: values, fetched: true, press: true }, () => {
          //console.log(this.state.data);
        });
      });
  }
  applyJob(key) {
    var user = JSON.parse(localStorage.getItem("studentprofile"));
    firebase
      .database()
      .ref(`companyvacancyy/${key}/appliedStudents`)
      .push(user);
  }
  render() {
    var user = JSON.parse(localStorage.getItem("studentprofile"));
    var uid = user && user.uid;
    //console.log(user, uid);
    return (
      <div>
        <h1> Vacancies</h1>
        <table className="table table-bordered table-hover table-striped">
          <tr>
            <td>vacancy</td>
            <td>company name</td>
            <td>Email</td>
            <td>company number </td>
            <td>qualification</td>
            <td>salary</td>
          </tr>
          {this.state.fetched === true || this.state.press === true ? (
            this.state.data.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.vacancy}</td>
                  <td>{data.companyname}</td>
                  <td>{data.companyemail}</td>
                  <td>{data.companyno}</td>
                  <td>{data.qualification}</td>
                  <td>{data.salary}</td>
                  <td>
                    <button onClick={this.applyJob.bind(this, data.key)}>
                      Apply
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <center style={{ width: "100%" }}>
              <div className="loader" style={{ marginTop: "20%" }} />
            </center>
          )}
        </table>
      </div>
    );
  }
}

export default Vacancies;
