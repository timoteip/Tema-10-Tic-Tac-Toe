import React from "react";
import Square from "./Square";
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXTurn: true,
      isWinner: false,
      winner: "",
      drawCountdown: 9,
    };
  }
  async onSquareClick(index) {
    if (this.state.isWinner) {
      return;
    }
    const squares = [...this.state.squares];
    if (squares[index]) return;
    squares[index] = this.state.isXTurn ? "X" : "O";
    await this.setState({
      squares,
      isXTurn: !this.state.isXTurn,
      drawCountdown: this.state.drawCountdown - 1,
    });
    // mai puteam sa fac si sa trimit squares direct dar am zis ca fac cu await,
    //  nu stiu ce era mai bine
    if (this.checkWin()) {
      this.setState({ isWinner: !this.state.isWinner });
      this.props.endGame(this.state.winner);
    } else {
      if (this.state.drawCountdown == 0) {
        this.props.endGame("draw");
      }
    }
  }
  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      isXTurn: true,
      isWinner: false,
      winner: "",
      drawCountdown: 9,
    });
  }
  checkWin() {
    const squares = [...this.state.squares];
    let win = true;
    // check lines
    for (let i = 0; i < 3; i++) {
      win = true;
      if (squares[i * 3]) {
        for (let j = 1; j < 3; j++) {
          if (win == false) {
            j = 3;
          } else {
            if (squares[i * 3 + j] != squares[i * 3]) win = false;
          }
        }
      } else {
        win = false;
      }
      if (win) {
        this.setState({ winner: squares[i * 3] });
        return true;
      }
    }
    //check cols
    for (let i = 0; i < 3; i++) {
      win = true;
      if (squares[i]) {
        for (let j = 1; j < 3; j++) {
          if (win == false) {
            j = 3;
          } else {
            if (squares[i + j * 3] != squares[i]) win = false;
          }
        }
      } else {
        win = false;
      }
      if (win) {
        this.setState({ winner: squares[i] });
        return true;
      }
    }
    if (win == true) return true;
    else {
      win = true;
    }
    //check diagonals
    if (squares[4] && squares[0] == squares[4] && squares[4] == squares[8]) {
      this.setState({ winner: squares[4] });
      return true;
    }
    if (squares[4] && squares[2] == squares[4] && squares[4] == squares[6]) {
      this.setState({ winner: squares[4] });
      return true;
    }
    return false;
  }
  render() {
    return (
      <div className="board">
        {" "}
        {this.state.squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => this.onSquareClick(index)}
          />
        ))}{" "}
      </div>
    );
  }
}
