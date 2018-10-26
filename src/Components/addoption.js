import React, { Component } from "react";

class Options extends Component {
  adOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value;

    if (option) {
      this.props.adOption(option);
      // console.log(option);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.adOption.bind(this)}>
          <input type="text" name="option" />

          <button>add option </button>
        </form>
      </div>
    );
  }
}

export default Options;
