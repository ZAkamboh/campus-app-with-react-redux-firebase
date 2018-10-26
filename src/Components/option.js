import React, { Component } from "react";
import Mopt from "./moption.js";
class Options extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.removebutton}> Remove All</button>

        <h1>
          {this.props.opt.map(opti => (
            <Mopt
              key={opti}
              optiontext={opti}
              removeindivi={this.props.removeindivi}
            />
          ))}
        </h1>
      </div>
    );
  }
}

export default Options;
