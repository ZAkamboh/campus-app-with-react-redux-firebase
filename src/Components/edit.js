import React from "react";
import firebase from "../firebase/firebase";
import "./style.css";
export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: "",
      email: "",
      address: "",
      phone: "",
      key: "",
      loader: false
    };
  }
  componentWillMount() {
    const values = this.props.location.state.data;
    this.setState({
      name: values.name,
      id: values.id,
      phone: values.phone,
      address: values.address,
      email: values.email,
      key: values.key
    });
  }
  updateRecords() {
    this.setState({ loader: true });
    var data = {
      name: this.state.name,
      id: this.state.id,
      phone: this.state.phone,
      address: this.state.address,
      email: this.state.email
    };
    const user = JSON.parse(localStorage.getItem("user"));
    const uid = user && user.uid;
    firebase
      .database()
      .ref(`student_detail/${uid}/${this.state.key}`)
      .set(data)
      .then(() => {
        this.props.history.push("/find");
      });
  }
  render() {
    var styling = {
      marginTop: "30px"
    };
    var styles = {
      width: "600px"
    };
    return (
      <center style={styling}>
        <hr />
        <h4 className="alert alert-success">Update Your Record</h4>
        <div id="error" />
        <hr />
        <div id="errors" />

        <div style={styling} className="form-group">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-user" />
          </span>
          <input
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            style={styles}
            className="form-control"
            placeholder="Student Name"
            value={this.state.name}
            required
          />
        </div>
        <div style={styling} className="form-group">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-user" />
          </span>
          <input
            onChange={e => this.setState({ id: e.target.value })}
            type="text"
            style={styles}
            className="form-control"
            placeholder="Student Id"
            value={this.state.id}
            required
          />
        </div>
        <div style={styling} className="form-group">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-user" />
          </span>
          <input
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            style={styles}
            className="form-control"
            placeholder="Email"
            value={this.state.email}
            required
          />
        </div>

        <div className="form-group" style={styling}>
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-user" />
          </span>
          <input
            onChange={e => this.setState({ address: e.target.value })}
            type="text"
            style={styles}
            className="form-control"
            placeholder="Address"
            value={this.state.address}
            required
          />
        </div>

        <div className="form-group" style={styling}>
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-lock" />
          </span>
          <input
            onChange={e => this.setState({ phone: e.target.value })}
            type="text"
            style={styles}
            className="form-control"
            placeholder="Phone Number"
            value={this.state.phone}
            required
          />
        </div>
        <div className="form-group" style={styling} />

        <button
          className="btn btn-info"
          style={styling}
          onClick={this.updateRecords.bind(this)}
        >
          Update Records
        </button>
        {this.state.loader && <div className="loader" />}

        <div id="pleasewait" style={{ marginTop: "30px" }} />
      </center>
    );
  }
}
