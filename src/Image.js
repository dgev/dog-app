import React, { Component } from "react";

const styling = {
  width: "100%",
  height: "300px",
  objectFit: "cover"
};
export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  getImage = async () => {
    let promiseImages = [];
    for (let i = 0; i < 3; i++) {
      try {
        promiseImages.push(fetch("https://dog.ceo/api/breeds/image/random"));
      } catch (e) {
        console.log(e.message);
      }
    }
    Promise.all(promiseImages).then(responses => {
      const jsons = [];
      for (let i = 0; i < responses.length; i++) {
        jsons.push(responses[i].json());
      }
      Promise.all(jsons).then(results => {
        this.setState({
          images: results.map(r => r.message)
        });
      });
    });
  };

  // componentDidMount = () => {
  //   (async () => {
  //     try {
  //       const promiseImages = await Promise.all(
  //         new Array(3).fill(fetch("https://dog.ceo/api/breeds/image/random"))
  //       );
  //       console.log(promiseImages);

  //       const results = await Promise.all(promiseImages).then(responses => {
  //         responses.map(elem => elem.json());
  //       });
  //       this.setState({
  //         images: results.map(r => r.message)
  //       });
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   })();
  // };

  // componentDidMount = () => {
  //   (async () => {
  //     try {
  //       const promiseImages = await Promise.all(
  //         new Array(1).fill(fetch("https://dog.ceo/api/breeds/image/random"))
  //       );
  //       const results = await Promise.all(
  //         promiseImages.map(elem => elem.json())
  //       );
  //       this.setState({
  //         images: results.map(r => r.message)
  //       });
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   })();
  // };

  componentDidMount = () => {
    try {
      this.getImage();
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    return (
      <>
        {this.state.images.length ? (
          <img
            src={this.state.images[this.props.currentSrc]}
            style={styling}
          ></img>
        ) : (
          <div style={{ textAlign: "center" }}>Loading...</div>
        )}
      </>
    );
  }
}
