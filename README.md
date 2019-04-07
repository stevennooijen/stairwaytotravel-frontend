This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

#### TODO

Functionality:

- [x] Connect own domain name `stairway.travel`
- [x] Connect deployed front-end to backend
- [x] Save search tab query values and use them in Explore tab with session storage
- [x] Make sure Explore tab selection button default to whatever is stored in session storage
- [ ] Add user interaction like/dislike functionality
  - [ ] Fetch a new destination `onClick`
  - [ ] Add liked/disliked destination to `sessionStorage`
  - [ ] Add motion animation to throw away a card after like/dislike
  - [ ] Do a POST request to save the interaction to database / storage bucket
- [ ] Move app to a subdomain like `app.stairway.travel`
- [ ] Set up homepage on main domain `stairway.travel`

UI:

- [ ] Add Select options for activities on the search screen, use Chips?
- [ ] Make line between navbar and app. Use divider?
- [x] Make sure Navbar updates based on url and upon browser refresh
- [ ] Build photo carousel on destination card, check out material ui steppers
- [ ] Extend destination card with more information

## Table of Contents

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json  # contains proxy for dev API server
  public/
    index.html  # I want a blank page with a `div` called 'root'
    favicon.ico
  src/
    pages/
      search/
      explore/
      bucket/
    ui/
    App.css
    App.js  # root component of the react app with `<App />` being the top component in the hierarchy
    App.test.js
    index.css
    index.js  # traditional entry point for node apps
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

- `public/index.html` is the page template;
- `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

### Code formatting and linting

ESLint and Prettier are applied to the project.

## Developing

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

## Deployment

To create a `build` directory with a production build of your app, run:

```
npm run build
```

### [Firebase](https://firebase.google.com/)

To host on Firebase, configure as a single-page app when initializing in the project root directory with `firebase init`. This will create a `firebase.json` file that contains installation specifics for Firebase, like which directory to deploy (in our case the `build` folder)

After createing the build, deploy with:

```bash
firebase deploy
```

Check out the [getting started guide](https://firebase.google.com/docs/hosting/quickstart) for more info. Or this [blog](https://www.robinwieruch.de/firebase-deploy-react-js/) with a bit more details.

#### Connecting a custom domain

Check out the [Firebase instructions](https://firebase.google.com/docs/hosting/custom-domain)

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

If front- and back-end are hosted on different domains, you will have to set up CORS on the back-end to allow access for the front-end. Also, you will now need to explicitely refer to that other url in your `fetch(BASE_URL + "/api/`) call.

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

## Resources

Possibly helpfull tutorials:

- https://medium.com/get-it-working/get-googles-firestore-working-with-react-c78f198d2364
- https://www.youtube.com/playlist?list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3
