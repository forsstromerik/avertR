# avertR
Avert potentially harmful incidents before they happen by notifying security providers in a smooth way

## Demo video
Click the GIF below to check out the demo video!

[![alt text](https://media.giphy.com/media/RMyRaTQYy6Jnu48cJd/giphy.gif)](https://youtu.be/22iTt0Nb-rA)

## What is avertR?
avertR is an app that makes it easy for citizens to notify security providers in the event of a threatening situation. With just one click, your location is sent to the relevant security provider - you may also provide additional information about the incident

The responsible security provider gets a live overview of reported incidents in the area and can easily distribute personnel accordingly. Together with recent activity data from the police the provider can optimize the allocation of resources and help citizens more efficiently, with the added benefit of cutting costs.

The data collected provides an insight into when and where these situations occur, which can be used for future predictions.

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
