export default class FacebookClient {
  constructor(appId) {
    this.appId = appId;
    this.FB;
    this.userId;
    this.loggedIn = false;
    this._loadSdk();
  };

  // All api requests will go through here
  api(path) {
    if (!this.loggedIn) {
      return this.login().then((response) => {
        this.loggedIn ? this.api(path) : response.error;
      })
      .catch((error) => {
        console.log("Error trying to login to Facebook!")
      });
    };
    return new Promise((resolve, reject) => {
      this.FB.api(path, (response) => {
        if (!response || response.error) {
          return reject(response.error);
        }
        return resolve(response);
      });
    });
  };

  getAlbums() {
    return new Promise((resolve, reject) => {
      return this.api(`/${this.userId}/albums?fields=id,cover_photo,name`)
        .then((albums) => {
          return Promise.all(this.getAlbumCoverPromises(albums.data))
            .then((albumCoverPhotos) => {
              const albumCovers = albumCoverPhotos.map((coverPhoto) => {
                return {
                  isAlbumPhoto: true,
                  name: coverPhoto.album.name,
                  image: coverPhoto.images[0].source,
                  id: coverPhoto.album.id
                }
              });
              resolve(albumCovers);
            })
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getAlbumCoverPromises(albumList) {
    return albumList.map((album) => {
      return this.api(`/${album.cover_photo.id}?fields=images,name,album`);
    });
  };

  getPhotosFromAlbum(albumId) {
    return new Promise((resolve, reject) => {
      return this.api(`/${albumId}/photos?fields=id,images,name`)
        .then((response) => {
          resolve(this.getPhotoImageSources(response.data))
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getPhotoImageSources(photoList) {
    return photoList.map((photo) => {
      return {
        isAlbumPhoto: false,
        id: photo.id,
        image: photo.images[0].source,
        name: photo.name
      };
    });
  };

  login() {
    return new Promise((resolve, reject) => {
      this.FB.login((response) => {
        if (response.status === 'connected') {
          this.loggedIn = true;
          this.userId = response.authResponse.userID;
          return resolve(response);
        }
        this.loggedIn = false;
        return reject(response);
      }, { scope: 'user_photos' })
    })
    .catch((error) => {
      console.log("Error logging into Facebook!");
    });
  };

  _loadSdk() {
    window.fbAsyncInit = () => {
        FB.init({
            appId: this.appId,
            status: true,
            xfbml: true,
            version: 'v2.9'
        });

        this.FB = FB;
    }

    // Load the SDK Asynchronously
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0],
            fbRoot;

        if (d.getElementById(id)) { return; }

        // Create fb-root div to stop Facebook SDK showing a warning.
        fbRoot = d.createElement('div');
        fbRoot.id = 'fb-root';
        d.body.appendChild(fbRoot);

        js = d.createElement(s);
        js.id = id;
        js.async = true;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  };
};
