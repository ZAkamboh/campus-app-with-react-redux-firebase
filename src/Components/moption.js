import React, { Component } from "react";

class Mopt extends Component {
  render() {
    return (
      <div>
        {this.props.optiontext}
        <button onClick={f => this.props.removeindivi(this.props.optiontext)}>
          {" "}
          remove{" "}
        </button>
      </div>
    );
  }
}

export default Mopt;
