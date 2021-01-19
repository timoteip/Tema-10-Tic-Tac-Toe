import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this._board = React.createRef();
    this.state = {
      isWinner: false,
      winner: "",
      draw: false,
    };
  }
  endGame(winner) {
    if (winner == "draw") {
      this.setState({
        draw: true,
      });
    } else
      this.setState({
        winner: winner,
        isWinner: true,
      });
  }
  emitGameReset() {
    this._board.current.resetGame();
    this.setState({
      isWinner: false,
      winner: "",
      draw: false,
    });
  }
  render() {
    let winner = this.state.isWinner ? (
      <h3> The winner is {this.state.winner} </h3>
    ) : null;
    console.log(winner);
    return (
      <div className="game">
        <h1>Tic tac toe</h1>

        <Board ref={this._board} endGame={(winner) => this.endGame(winner)} />
        {winner}
        <h3>{this.state.draw ? "It is a draw" : ""}</h3>
        {winner || this.state.draw ? (
          <button
            onClick={() => {
              this.emitGameReset();
            }}
          >
            Reset Game
          </button>
        ) : null}
      </div>
    );
  }
}
