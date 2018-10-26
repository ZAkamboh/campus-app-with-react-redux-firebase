import React, { Component } from "react";
import Options from "./option";
import AddOption from "./addoption";
import * as firebase from "firebase";

class Myapp extends Component {
  constructor() {
    super();

    this.state = {
      title: "crud app",
      options: ["saif", "zubair"],
      todo: ""
    };
  }
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.props.history.push("/login");
    }
  }
  removeall() {
    this.setState({ options: [] });
  }
  handleChange = event => {
    this.setState({ todo: event.target.value });
  };
  addoption = () => {
    var todo = this.state.todo;
    this.setState(prevState => ({ options: prevState.options.concat(todo) }));
  };

  // adddoption(option, prevState) {
  //   //this.setState(prevState => ({ options: prevState.options.concat(option) }));
  //   firebase
  //     .database()
  //     .ref()
  //     .set({
  //       options: prevState.options.concat(option)
  //     });
  // }
  removeindivi(a) {
    this.setState(prevD => ({
      options: prevD.options.filter(b => {
        return a !== b;
      })
    }));
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        {/* <Options
          opt={this.state.options}
          removebutton={this.removeall.bind(this)}
          removeindivi={this.removeindivi.bind(this)}
        /> */}
        {/* <table className="table table-bordered table-hover table-stripped">
          {this.state.options.map((val, index) => {
            return (
              <tr>
                <td>{val}</td>
              </tr>
            );
          })}
        </table> */}

        {this.state.options.map(val => (
          <p key={val}>{val}</p>
        ))}

        {/* <form onSubmit={this.addoption}> */}
        <input type="text" name="option" onChange={this.handleChange} />
        <button onClick={this.addoption.bind(this)}>add option </button>
        {/* </form> */}
        {/* <AddOption adOption={this.adddoption.bind(this)} /> */}
      </div>
    );
  }
}

export default Myapp;
