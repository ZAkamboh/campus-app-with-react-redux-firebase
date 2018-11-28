import React, { Component } from "react";
import firebase from "../firebase/firebase";
import "./style.css";
class Find extends Component {
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
    }
  }
  delete(key) {
    const again = [];
    const user = JSON.parse(localStorage.getItem("user"));
    const uid = user && user.uid;
    firebase
      .database()
      .ref(`companyvacancyy/${key}`)
      .remove()
      .then(() => {
        firebase
          .database()
          .ref(`companyvacancyy`)
          .on("value", snap => {
            var data = snap.val();
            // var keys = Object.keys(data);
            for (let keys in data) {
              if (data[keys]["companyUid"] === uid) {
                again.push({ ...data[keys], key: keys });
              }
            }
            // console.log(again);
            this.setState({ data: again, fetched: true });
          });
      });
  }
  componentDidMount() {
    var values = [];
    var user = JSON.parse(localStorage.getItem("user"));
    var uid = user && user.uid;
    console.log(uid);
    firebase
      .database()
      .ref(`companyvacancyy`)
      .on("value", snap => {
        var data = snap.val();
        // var keys = Object.keys(data);
        for (let keys in data) {
          if (data[keys]["companyUid"] === uid) {
            values.push({ ...data[keys], key: keys });
          }
        }
        console.log(values);
        this.setState({ data: values, fetched: true });
      });
  }
  render() {
    return (
      <div>
        <center>
          <table className="table table-bordered table-hover table-striped">
            <tr>
              <td>vacancy</td>
              <td>company name</td>
              <td>Email</td>
              <td>company number </td>
              <td>qualification</td>
              <td>salary</td>
            </tr>
            {this.state.fetched === true ? (
              this.state.data.map(data => {
                return (
                  <tr key={data}>
                    <td>{data.vacancy}</td>
                    <td>{data.companyname}</td>
                    <td>{data.companyemail}</td>
                    <td>{data.companyno}</td>
                    <td>{data.qualification}</td>
                    <td>{data.salary}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          this.props.history.push("/edit", { data: data })
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          this.props.history.push("/appliedstudents", {
                            data: data.key
                          })
                        }
                      >
                        View Applied Students
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={this.delete.bind(this, data.key)}
                      >
                        Delete
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
        </center>
      </div>
    );
  }
}

export default Find;
