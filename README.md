# Facebook API
Check it out live [here](https://damp-fjord-87429.herokuapp.com/). NOTE: Looks like Facebook have banned any heroku domains so this won't actually work properly.
Best bet would be to run it locally, you will need to add a FACEBOOK_APP_ID environment variable with your app id in a .env file or just when starting up the server.

## Running locally

After cloning the repository locally run the following:

```
npm install
npm start
```

Then navigate to `localhost:3000`. If you notice any errors, chances are you may need to add `localhost:3000` to your Facebook developer app whitelist.

## Development
Currently utilises watch mode in webpack and nodemon so any changes you make will automatically be built / updated on both the front and backend! In its current form this does require nodemon to be installed globally.

To get set up in dev mode run the following in one terminal window:
```
npm run hot
```

And in another one simultaneously:
```
npm run dev
```
