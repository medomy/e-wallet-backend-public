# Node.Js E-Wallet backend

- an E-Wallet backend simple service for the E-wallet react native application.

- used this service for the react native app [check E-wallet app](https://developers.themoviedb.org/3/getting-started/introduction)

## installation

clone the repo first
```bash
  npm clone git@github.com:medomy/movie-apppreact-native.git
  cd movie-apppreact-native
```
then start the app 
```bash
  npm i
  npm start
```
## Walk through
- first we have a home screen that shows a profile data with some movies lists to show the most important data first.
- then we have a detailed screen for each movie you can navigate to by clicking on the movie card.
- then we can add the movie to to watch list which we can get to in the bottom tab bar
- show a list of favourite movies in the To-Watch screen
- search functionality provided in a seperate search screen with last 5 recent searches.
## Tech Stack

**Client:** React-Native, redux, Typescript , Axios , RTK

**Server:** [themoviedb](https://developers.themoviedb.org/3/getting-started/introduction)

**libraries:** 
- @react-navigation
- react-native-splash-screen
- axios
- @react-navigation/bottom-tabs
- @reduxjs/toolkit