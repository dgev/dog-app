import React, { Component } from "react";

const images = new Array(3).fill(0);

const styling = {
  width: "80%",
  height: "500px",
  border: "1px solid black",
  objectFit: "cover"
};
export default class Image extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentSrc: 0
  //   };
  // }

  getImage = async () => {
    let images = [];
    for (let i = 0; i < 3; i++) {
      try {
        fetch("https://dog.ceo/api/breeds/image/random")
          .then(response => response.json())
          .then(json => (images[i] = json.message));
      } catch (e) {
        console.log(e.message);
      }
    }
    return images;
  };
  componentDidMount = async () => {
    // this.timerID = setInterval(async () => {
    let pic;
    try {
      // pic = await this.getImage();
      console.log(await this.getImage());
    } catch (e) {
      console.log(e.message);
    }
    // });
  };

  render() {
    return <img src={images[this.props.currentSrc]} style={styling}></img>;
  }
}
