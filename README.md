# avertR
Avert potential incidents involving humans before they happen by notifying authorities in an smooth way

## What is avertR?
avertR is an app that makes it easy for citizens to notify the responsible authority in the event of a threatful situation. With a few simple clicks your location is sent to the authority with additional information given by you about what's happening.

The responsible authority gets a live overview of reported incidents in the area and can easily distribute personnel accordingly. Together with recent activity data from the police the authority can optimize the allocation of resources and help citizens more efficiently. A natural consequence of this is that the authority can also save a lot of money.

The data collected provides good insight to when and where these situations occur, which is of good value for predictions for the future.

## Try it out
avertR uses [yarn](https://yarnpkg.com) to manage dependencies and run the servers, so make sure it is installed and then follow the instructions below.

### Backend
```
cd backend
yarn
yarn start
```
The backend can be found at [localhost:3000](http://localhost:3000).

### Admin view
```
cd frontend/admin
yarn
yarn start
```
The admin view can be found at [localhost:3001](http://localhost:3001).

### App
```
cd frontend/client
yarn
yarn start
```
The app can be found at [localhost:3002](http://localhost:3002).

## License
See the `LICENSE` file in the repository root.
