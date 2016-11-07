# Playfest <img src="frontend/www/img/playfest-logo.png" width="90" />

### What is it?
Playfest is an app made in one week in which the user can take a picture via their phone camera of a festival or concert poster, log in to Spotify and get a playlist with the top ten songs of artists displayed on that festival poster. The backend is built with Express and Node.js, and the frontend with Ionic which uses AngularJS. Our app uses an optical character recognition (OCR) API and the spotify API.

### Challenges
One challenge we faced was figuring out how our app could recognise which words on the poster were relevant to creating our playlists. We tried a few approaches, for example identifying the festival by location or dates and using the Songkick API to cross check the festival and then find relevant artists. However, because there is no consistency in the appearance and format of this information from one poster to the next, none of these strategies produced a reliable solution. We overcame this hurdle when we realised that our OCR software could also recognise the relative size of the text displayed on the page and therefore, since big acts are usually represented with larger text, we could tailor our code to identify those prominent artists. Right now, the OCR is not perfect (for example, it cannot recognise some artists due to warped fonts), but we feel happy we've reached a workable solution and will strive to keep improving our app.

### Watch a demo
https://www.youtube.com/watch?v=OAF3pvoFZVU&feature=youtu.be

### Styling
![Screenshot of PlayfestApp](https://cloud.githubusercontent.com/assets/16217360/15325347/056b1714-1c42-11e6-8693-4924301d1ca8.png)

### To set up
```
$ git clone https://github.com/eripheebs/playfest.git
$ cd playfest
$ npm install
$ cd frontend
$ npm install
$ bower install
```

### To run the app
```
$ cd playfest
$ export to $CLIENT_ID your spotify client id key
$ export to $CLIENT_SECRET your spotify client secret key
$ node server/server.js
$ cd frontend
$ ionic serve
```
* host will be running on $PORT or 5000 (default)

### To view frontend in simulator (ios/android)
```
$ cd frontend
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
```

### To run tests
```
$ cd playfest
```
Mocha tests for the backend:
```
$ mocha test/backend
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
