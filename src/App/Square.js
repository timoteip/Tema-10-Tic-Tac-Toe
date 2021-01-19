import React from "react";
import Square from "./Square";
export default class Game extends React.Component {
  render() {
    return (
      <div
        className="square"
        onClick={() => {
          this.props.onSquareClick();
        }}
      >
        {this.props.value}
      </div>
    );
  }
}
