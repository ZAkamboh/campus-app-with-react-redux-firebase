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
      alert("Please Login First");
      this.props.history.push("/login");
    }
  }
  delete(key) {
    const again = [];
    const user = JSON.parse(localStorage.getItem("user"));
    const uid = user && user.uid;
    firebase
      .database()
      .ref(`student_detail/${uid}/${key}`)
      .remove()
      .then(() => {
        firebase
          .database()
          .ref(`student_detail/${uid}`)
          .on("value", snap => {
            var data = snap.val();
            // var keys = Object.keys(data);
            for (let keys in data) {
              again.push({ ...data[keys], key: keys });
            }
            console.log(again);
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
      .ref(`student_detail/${uid}`)
      .once("value", snap => {
        var data = snap.val();
        // var keys = Object.keys(data);
        for (let keys in data) {
          values.push({ ...data[keys], key: keys });
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
              <td>User Name</td>
              <td>Address</td>
              <td>Email</td>
              <td>Phone </td>
              <td>I.D</td>
            </tr>
            {this.state.fetched === true ? (
              this.state.data.map(data => {
                return (
                  <tr key={data}>
                    <td>{data.name}</td>
                    <td>{data.address}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td>{data.id}</td>
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
