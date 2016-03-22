### Settings

You need node.js installed. Then do
```sh
$ npm install -g gulp
$ npm install -g bower
$ npm install -g http-server
```

### Installation

```sh
$ git clone https://github.com/ocnskyy/beardyApp.git
$ cd beardyApp
$ bower install
```

### Run

```sh
$ http-server
```
Run on http://localhost:8080

### Development
All code is separated for controllers and config, gulp will concat it all to bundle.js. To activate automatic gulp listener, do:
```sh
$ gulp watch
```
