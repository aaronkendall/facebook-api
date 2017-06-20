export default class FacebookClient {
  constructor(appId) {
    this.appId = appId;
    this.FB;
    this.loggedIn = false;
    this._loadSdk();
  };

  // All api requests will go through here
  api(path) {
    if (!this.loggedIn) {
      return this.login().then((response) => {
        this.loggedIn ? this.api(path) : null;
      })
      .catch((error) => {
        console.log("Error trying to login to Facebook!")
      });
    };
    return new Promise((resolve, reject) => {
      this.FB.api(`/me/${path}`, (response) => {
        if (!response || response.error) {
          return reject(response.error);
        }
        return resolve(response);
      });
    });
  };

  login() {
    return new Promise((resolve, reject) => {
      this.FB.login((response) => {
        if (response.status === 'connected') {
          this.loggedIn = true;
          return resolve(response);
        }
        this.loggedIn = false;
        return reject(response);
      })
    })
    .catch((error) => {
      console.log("Error logging into Facebook!");
    });
  };

  _loadSdk() {
    // if (!this.FB) {
    //     return new Promise((resolve, reject) => {
            window.fbAsyncInit = () => {
                FB.init({
                    appId: this.appId,
                    status: true,
                    xfbml: true,
                    version: 'v2.9'
                });

                this.FB = FB;
                resolve();
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
        // }
        // .catch((error) => {
        //     logger.error("Failed to load Facebook SDK", error);
        // });
    // }
    // return Promise.resolve();
  };
};
