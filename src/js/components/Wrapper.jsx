import React from 'react';

export default class Wrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      loading: true,
      albums: [],
      pictures: []
    };
  };

  render() {
    return(
      <h1>Hello</h1>
    )
  };
};
