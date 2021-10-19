import React from "react";

class CellButton extends React.Component {
  render() {
    return (
      <button
        disabled={this.props.disabled}
        style={this.props.style}
        onClick={this.props.onClick}
      >
        __
      </button>
    );
  }
}

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: "Red",
      gameSpaces: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
      ],
    };
  }

  checkWin() {
    let spaces = this.state.gameSpaces;
    let hCount = 0;
    let vCount = 0;
    let curPlayer;

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (spaces[row][col] === null) {
          hCount = 0;
          curPlayer = null;
        } else if (spaces[row][col] === curPlayer) {
          hCount++;
        } else {
          hCount = 1;
          curPlayer = spaces[row][col];
        }

        if (hCount >= 4) {
          console.log(curPlayer + " Wins");
          return;
        }
      }
    }

    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {
        if (spaces[row][col] === null) {
          vCount = 0;
          curPlayer = null;
        } else if (spaces[row][col] === curPlayer) {
          vCount++;
        } else {
          vCount = 1;
          curPlayer = spaces[row][col];
        }

        if (vCount >= 4) {
          console.log(curPlayer + " Wins");
          return;
        }
      }
    }
  }

  // Renders 6 rows, 7 columns of buttons
  renderBtns() {
    let btns = [];
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        btns.push(
          <CellButton
            key={row + " " + col}
            disabled={false}
            onClick={(e) => {
              // Sets colour to current player's colour
              e.target.style.backgroundColor = this.state.player;
              e.target.disabled = true;

              // Updates the state of the gameSpaces
              let newGameSpaces = this.state.gameSpaces;
              newGameSpaces[row][col] = this.state.player;
              this.setState({ gameSpaces: newGameSpaces });

              this.checkWin();

              // Changes current player
              this.setState({
                player: this.state.player === "Red" ? "Yellow" : "Red",
              });
            }}
          />
        );
      }
      btns.push(<br key={row + "br"} />);
    }
    return btns;
  }

  render() {
    return (
      <div id="gameDiv">
        <div id="curPlayer">{this.state.player}'s move</div>
        <div id="gridDiv">{this.renderBtns()}</div>
      </div>
    );
  }
}
