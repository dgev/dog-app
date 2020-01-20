import React from "react";
import Image from "./Image";
import BreedList from "./BreedList";
import { Button } from "@material-ui/core";

const divStyle = {
  width: "100%",
  maxWidth: 600,
  margin: "10px auto",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const imageStyle = {
  flex: 1,
  padding: 10
};

const buttonStyle = {
  width: "100px"
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSrc: 0,
      length: 3,
      breed: []
    };
  }

  next = () => {
    this.setState(prev => ({
      currentSrc: (prev.currentSrc + 1) % this.state.length
    }));
  };

  previous = () => {
    this.setState(prev => ({
      currentSrc:
        prev.currentSrc === 0
          ? this.state.length - 1
          : this.state.currentSrc - 1
    }));
  };

  getBreed = async () => {
    try {
      await fetch("https://dog.ceo/api/breeds/list/all")
        .then(resp => resp.json())
        .then(results =>
          this.setState({
            breed: results.message
          })
        );
    } catch (e) {
      console.log(e.message);
    }
  };

  componentDidMount = () => {
    this.play();
    this.getBreed();
    // console.log(this.state.breed);
  };

  play = () => {
    setInterval(this.next, 1500);
  };

  render() {
    const lists = Object.keys(this.state.breed).map(key => (
      <BreedList
        item={key}
        subBreed={this.state.breed[key]}
        exists={this.state.breed[key].length}
      />
    ));
    return (
      <div>
        <div style={divStyle}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.previous}
            style={buttonStyle}
            margin=""
          >
            Previous
          </Button>
          <div style={imageStyle}>
            <Image currentSrc={this.state.currentSrc} />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.next}
            style={buttonStyle}
          >
            Next
          </Button>
        </div>
        <div style={{ float: "left", display: "block", marginLeft: "6%" }}>
          {lists}
        </div>
      </div>
    );
  }
}
