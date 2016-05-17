# Playfest

Playfest is an app in which the user can take a picture via their phone camera of a festival or concert photo, log in to Spotify and get a playlist with top ten songs of artists displayed on that festival poster. It uses an optical character recognition API and the spotify API. The backend is built with Express and Node.js, and the frontend with Ionic which uses AngularJS.

### Watch a demo:
https://www.youtube.com/watch?v=OAF3pvoFZVU&feature=youtu.be

![Screenshot of PlayfestApp](https://cloud.githubusercontent.com/assets/16217360/15325347/056b1714-1c42-11e6-8693-4924301d1ca8.png)

### To set up:
```
$ git clone https://github.com/eripheebs/playfest.git
$ cd playfest
$ npm install
$ cd frontend
$ npm install
$ bower install
```

### To run the app:
```
$ cd playfest
$ export to $CLIENT_SECRET your spotify client key
$ node server/server.js
$ cd frontend
$ ionic serve
```
* host will be running on $PORT or 5000 (default)

### To view frontend in simulator:
```
$ cd frontend
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
```

### To run tests:
```
$ cd playfest
```
Mocha tests for the backend:
```
$ Mocha test/backend
```
Karma tests for the ionic frontend:
```
$ karma start test/karma.conf.js
```
Protractor integration tests:
```
$ webdriver-manager update
$ webdriver-manager start
```
* In a different console tab:
```
$ node backend/server.js
```
* In a different console tab:
```
$ cd frontend
$ ionic serve
```
* In a different console tab:
```
$ protractor test/protractor.conf.js
```
