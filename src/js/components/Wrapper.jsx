import React from 'react';

import FacebookClient from '../services/clients/FacebookClient';
const facebook = new FacebookClient(window._app.facebookAppId);

import Button from './button/Button';
import Loading from './loading/Loading';
import Card from './card/Card';

export default class Wrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      loading: true,
      items: []
    };
    this.login = this.login.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
  };

  login() {
    facebook.login().then((response) => {
      this.setState({ isLoggedIn: true });
      this.getAlbums();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  getAlbums() {
    facebook.getAlbums().then((response) => {
      this.setState({ items: response, loading: false });
    });
  };

  getAllPhotosInAlbum(albumId) {
    this._toggleLoading();
    facebook.getPhotosFromAlbum(albumId).then((response) => {
      this.setState({ items: response, loading: false });
    });
  };

  _toggleLoading() {
    this.setState({ loading: !this.state.loading });
  };

  _renderCards() {
    const { items } = this.state;
    return items.map((item) => {
      if (item.isAlbumPhoto) {
        return(
          <Card
            key={item.id}
            imageSrc={item.image}
            title={item.name}
            handleClick={() => this.getAllPhotosInAlbum(item.id)}
          />
        );
      }
      return(
        <Card
          key={item.id}
          imageSrc={item.image}
          title={item.name}
          handleClick={() => {}}
        />
      )
    });
  }

  _renderLoadingOrCards() {
    if (this.state.loading) {
      return <Loading />
    }
    return(
      <div className='card-container'>
        {this._renderCards()}
      </div>
    )
  };

  _renderGoBack() {
    if (this.state.items.length > 0 && this.state.items[0].isAlbumPhoto) {
      return null;
    }
    return <Button text='Go back' handleClick={this.getAlbums} />
  }

  render() {
    const { isLoggedIn, loading, items } = this.state;

    if (!isLoggedIn) {
      return(
        <div className='vertical-center-container'>
          <Button text='Sign into Facebook' handleClick={this.login} />
        </div>
      );
    };

    return(
      <div className='container'>
        <h1>Facebook Photo Viewer</h1>
        {this._renderGoBack()}
        {this._renderLoadingOrCards()}
      </div>
    );
  };
};
