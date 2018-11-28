import React from "react";
import firebase from "../firebase/firebase";
import "./style.css";
export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vacancy: "",
      companyname: "",
      companyemail: "",
      companyno: "",
      qualification: "",
      salary: "",
      key: "",
      loader: false
    };
  }
  componentWillMount() {
    const values = this.props.location.state.data;
    this.setState({
      vacancy: values.vacancy,
      companyname: values.companyname,
      companyemail: values.companyemail,
      companyno: values.companyno,
      qualification: values.qualification,
      salary: values.salary,
      key: values.key
    });
  }
  updateRecords() {
    const user = JSON.parse(localStorage.getItem("user"));
    const uid = user && user.uid;
    this.setState({ loader: true });
    var data = {
      vacancy: this.state.vacancy,
      companyname: this.state.companyname,
      companyemail: this.state.companyemail,
      companyUid: uid,
      companyno: this.state.companyno,
      qualification: this.state.qualification,
      salary: this.state.salary
    };
    firebase
      .database()
      .ref(`companyvacancyy/${this.state.key}`)
      .set(data)
      .then(() => {
        this.props.history.push("/mypostedvacancies");
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
            onChange={e => this.setState({ vacancy: e.target.value })}
            type="text"
            style={styles}
            className="form-control"
            placeholder="vacancy"
            value={this.state.vacancy}
            required
          />
        </div>
        <div style={styling} className="form-group">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-user" />
          </span>
          <input
            onChange={e => this.setState({ companyname: e.target.value })}
            type="text"
            style={styles}
            className="form-control"
            placeholder="company name"
            value={this.state.companyname}
            required
          />
        </div>
        <div style={styling} className="form-group">
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-user" />
          </span>
          <input
            onChange={e => this.setState({ companyemail: e.target.value })}
            type="text"
            style={styles}
            className="form-control"
            placeholder=" company Email"
            value={this.state.companyemail}
            required
          />
        </div>

        <div className="form-group" style={styling}>
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-user" />
          </span>
          <input
            onChange={e => this.setState({ companyno: e.target.value })}
            type="text"
            style={styles}
            className="form-control"
            placeholder="number"
            value={this.state.companyno}
            required
          />
        </div>

        <div className="form-group" style={styling}>
          <span className="input-group-addon">
            <i className="glyphicon glyphicon-lock" />
          </span>
          <input
            onChange={e => this.setState({ qualification: e.target.value })}
            type="text"
            style={styles}
            className="form-control"
            placeholder="qualification"
            value={this.state.qualification}
            required
          />
          <input
            onChange={e => this.setState({ salary: e.target.value })}
            type="text"
            style={styles}
            className="form-control"
            placeholder="salary"
            value={this.state.salary}
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
