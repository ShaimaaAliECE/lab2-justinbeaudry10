import React from "react";
import { Row } from "reactstrap";

class CellButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>__</button>;
  }
}

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { player: "Red" };
  }

  // Renders 6 rows, 7 columns of buttons
  renderBtns() {
    let btns = [];
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        btns.push(
          <CellButton
            row={row}
            col={col}
            onClick={(e) => {
              this.setState({
                player: this.state.player === "Red" ? "Yellow" : "Red",
              });
            }}
          />
        );
      }
      btns.push(<br />);
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
