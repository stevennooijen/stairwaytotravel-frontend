# Stairway to Travel: Frontend

[Stairway to Travel](https://stairwaytotravel.com/) offers personalized travel
recommendations that help you shape unique itineraries.

Stairway to Travel has long been my dream project with the aspiration of
becoming a profitable business. Now, I am donating my code to the community
that I have benefitted of so much in the creation of this website. I hope you
will learn or benefit from what I did. Please feel free to reach out in case
of questions or remarks!

## About this repo

This is the code repository containing the frontend code for Stairway to
Travel's website. The user interface is created using the
[React](https://reactjs.org/) JavaScript library and the app is deployed on
[Google Firebase](https://firebase.google.com/).

Code for the backend web-service API and data preparation can be found in the
related
[stairwaytotravel-backend](https://github.com/stevennooijen/stairwaytotravel-backend)
repository.

**Warning:** as a Data Scientist / Python coder, this was my first serious
JavaScript project. Hence, the folder structure and code will definitely be
considered messy and inefficient by experienced frontend developers. Please
keep this in mind when using my code as example for your own purposes.

### Folder structure

This project was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).

The project looks as follows:

    .
    ├── public
    │   ├── index.html      # I want a blank page with a `div` called 'root'
    │   └── ...             # Files required in `public/index.html`
    ├── src
    │   ├── assets          #
    │   ├── components      #
    │   ├── pages           #
    │   ├── ui              #
    │   ├── App.js          # root component of the react app with `<App />` being the top component in the hierarchy
    │   ├── index.css       #
    │   ├── index.js        # traditional entry point for node apps
    │   ├── theme.js        #
    │   └── ...
    ├── firebase.json       # installation specifics for Firebase
    ├── package-lock.json   #
    ├── package.json        # contains proxy for dev API server
    └── README.md

For the project to build, these files must exist with exact filenames:

- `public/index.html` is the page template;
- `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

Only files inside `public` can be used from `public/index.html`.

### Preparing your working environment

For this project I used [nvm](https://github.com/nvm-sh/nvm) as node version
manager and npm as the package manager. Set yourself up using:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install node
```

Then go the the project folder and run `npm install`. This command will read all
the dependencies that are defined in the `package.json` file and automatically
installs them for you.

### Code formatting and linting

ESLint and Prettier are applied to the project.

### Git

We stick to the branching model as
[outlined here](https://nvie.com/posts/a-successful-git-branching-model/).
This means we have the two major branches of `master` and `develop`, and can
have additional branches for features or hotfixes. To keep track of branch
history, we use the `--no-ff` flag when merging between the two:

```bash
(on branch develop)$ git merge master
(resolve any merge conflicts if there are any)
git checkout master
git merge --no-ff develop
```

### Credentials

This app requires credentials to access third party APIs like Flickr,
Google Maps, Google Analytics and Google App Engine. These keys have not
been uploaded to Git and you will have to get your own keys if you want
to run the project yourself.

Keys are accessed through the `.env` and `.env.production` files. I have
included empty examples in the project root.

## Developing

Before running the frontend locally for development, make sure the Python
backend server is running on localhost as well. See instructions for this in
the
[README](https://github.com/stevennooijen/stairwaytotravel-backend/tree/master/api#1-about-flask)
of the backend's `api/` folder.

To run the frontend, execute the following command in the project directory:

```bash
npm start
```

This will run the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Testing

I haven't written any automated tests that can be run using `npm test`.
See the documentation about [running tests](#running-tests) on how to do this.

The manual tests I did in case of new releases:

1. Test functionality for both web and mobile by toggling device toolbar
2. Test responsiveness by changing screen size for various devices
3. Test different browsers (mainly Chrome and Safari)
4. Test backend API integrations (App Engine logic, Mailchimp, ...)

## Deployment

To create a `build` directory with a production build of your app, run:

```
npm run build
```

### Deploying to Google Firebase

To host on Firebase, configure as a single-page app when initializing in the
project root directory with `firebase init`. This will create a
`firebase.json` file that contains installation specifics for Firebase, like
which directory to deploy (in our case the `build` folder)

We have set up two projects to deploy to, which are defined in `.firebaserc`.
Their project aliases are:

- `staging`: releases to Firebase project
  [`stairwaytotravel-release`](https://stairwaytotravel-release.web.app/)
- `production`: releases to Firebase project
  [`stairwaytotravel`](https://stairwaytotravel.com/)

Before deploying make sure the right usage profile is set up using:

```bash
firebase use <project_alias>
```

Having activated the right project, you can deploy the build with:

```bash
firebase deploy
```

Check out the
[getting started guide](https://firebase.google.com/docs/hosting/quickstart)
for more info. Or this
[blog](https://www.robinwieruch.de/firebase-deploy-react-js/) with a bit
more details.

### Connecting a custom domain

Check out the
[Firebase instructions](https://firebase.google.com/docs/hosting/custom-domain)

### Connecting React with back-end Flask API server

There's two options.

1. Both front- and back-end are hosted on the same domain.
2. Front- and back-end are hosted on different domains.

See solutions below for both cases.

#### 1, Proxying API Requests in Development

If both front- end back-end are hosted on the same domain, this means that the back-end is likely hosted on an extension of the domain like `example.com/api`. The api can then be called with `fetch("/api/")`, assuming that the base url is the same.

When in local development, front- and backend may be hosted on different ports. To solve this, one can tell the development server to [proxy](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development) any unknown requests to your API server on another local port. Do this by adding a `proxy` field to your `package.json`, e.g.:

```js
  "proxy": "http://localhost:5000",
```

This way, when you `fetch('/api/todos')` in development, the development server will proxy your request to `http://localhost:5000/api/todos` as a fallback.

#### 2. Using environment variables to refer to the right domain

If front- and back-end are hosted on different domains, you will have to set up
[CORS on the back-end](https://github.com/stevennooijen/stairwaytotravel-backend/tree/master/api#cors-support)
to allow access for the front-end. Also, you will now need to explicitely refer
to that other url in your `fetch(BASE_URL + "/api/`) call.

As the URL might differ for `development` and `production` build, use `.env` and `.env.production` files to respectively set and overwrite the environment variable of interest. Read about it [here](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables) in greater detail.

Call these variables using `process.env`:

```html
<div>
  <small>
    You are running this application in <b>{process.env.NODE_ENV}</b>{' '}
    mode, with the following base url:
    <b>{process.env.REACT_APP_API_URL}</b>
  </small>
</div>
```

## TODO

- [ ] Clean up files
- [ ] Add LICENSE?
- [ ] Link intro text in this README to blog post.
- [ ] Add reference to issues with possible next steps?
- [ ] Explain folder structure
- [ ] check credentials and paths
