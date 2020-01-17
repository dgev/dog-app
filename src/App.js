import React from "react";
import Image from "./Image";
import { Button } from "@material-ui/core";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSrc: 0
    };
  }

  next = () => {
    this.setState(prev => ({
      currentSrc: (prev.currentSrc + 1) % 3
    }));
  };

  previous = () => {
    this.setState(prev => ({
      currentSrc: 3 - Math.abs((prev.currentSrc + 1) % 3)
    }));
  };

  render() {
    return (
      <div style={{ display: "flex ", flex: "1", justifyContent: "center" }}>
        <div style={{ maxWidth: "1024px" }}>
          <Button variant="contained" color="primary" onClick={this.previous}>
            Previous
          </Button>
          <Image currentSrc={this.state.currentSrc} />
          <Button variant="contained" color="primary" onClick={this.next}>
            Next
          </Button>
        </div>
      </div>
    );
  }
}
