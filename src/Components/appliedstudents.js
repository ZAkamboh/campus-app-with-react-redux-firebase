import React, { Component } from "react";
import firebase from "../firebase/firebase";
class Appliedstudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetched: false
    };
  }
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("if you are company so login first");
      this.props.history.push("/");
    } else {
      var vacancyId = this.props.location.state.data;
      if (vacancyId) {
        firebase
          .database()
          .ref(`/companyvacancyy/${vacancyId}/appliedStudents`)
          .on("value", snap => {
            var value = snap.val();
            var data = [];
            for (let keys in value) {
              data.push(value[keys]);
            }
            this.setState({ data, fetched: true });
          });
      }
    }
  }

  componentDidMount() {
    // var values = [];
    // const user = JSON.parse(localStorage.getItem("studentprofile"));
    // var uid = user && user.uid;
    // //console.log(uid);
    // firebase
    //   .database()
    //   .ref(`studentprofile`)
    //   .once("value", snap => {
    //     var data = snap.val();
    //     for (let keys in data) {
    //       values.push({ ...data[keys] });
    //     }
    //     // console.log(data);
    //     this.setState({ data: values, fetched: true }, () => {});
    //   });
  }
  render() {
    return (
      <div>
        <center>
          <table className="table table-bordered table-hover table-striped">
            <tr>
              <td>student Name</td>
              <td>College Name</td>
              <td>Student Email</td>
              <td>Contact Number</td>
              <td>GPA</td>
              <td>Skills</td>
            </tr>
            {this.state.fetched === true ? (
              this.state.data.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.studentname}</td>
                    <td>{data.collegename}</td>
                    <td>{data.studentemail}</td>
                    <td>{data.contactnumber}</td>
                    <td>{data.gpa}</td>
                    <td>{data.skills}</td>
                  </tr>
                );
              })
            ) : (
              <center style={{ width: "100%" }}>
                <div className="loader" style={{ marginTop: "20%" }} />
              </center>
            )}
          </table>
        </center>
      </div>
    );
  }
}

export default Appliedstudents;
