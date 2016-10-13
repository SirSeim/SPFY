![Safe Place for Youth Logo](resources/Logo.jpg "Safe Place for Youth Database Project")
[![Version][version-img]][version-url]
[![Build Status][build-img]][build-url]
[![Codecov][codecov-img]][codecov-url]
[![Dependency Status][dependency-img]][dependency-url]
[![Dev Dependency Status][dev-dependency-img]][dev-dependency-url]
[![Known Vulnerabilities][snyk-img]][snyk-url]


[Read our Project Proposal](docs/Project_Proposal.md)

[Read our Requirements Specification](docs/Requirements_Specification.md)

[Read our Software Development Plan](docs/Software_Development_Plan.md)

### Requirements
Install `npm` and `postgres` if you don't already have them installed
```
brew install node
brew install postgresql
```

### Installation
download and install packages
```
git clone https://github.com/SirSeim/SPFY.git
cd SPFY
npm install
```

configure server with config file to go into `config/default.json`
```
{
    "Node-Server": {
        "host": <desired host>,
        "port": <desired port>,
        "logToConsole": <desired logging boolean>

    }
}
```
Alternately, get the most recent config folder from Team member/Slack

### Using Database

Initialize PostgreSQL for SPFY
```
npm run db-init
```

Start Database
```
npm run db-start
```

Stop Database
```
npm run db-stop
```

### Running & Development

Start server
```
npm start
```

Run Tests
```
npm test
npm run lint
```

To view a coverage report, run `npm test`, then `npm run report`, then open up `coverage/lcov-report/index.html` in a webbrowser

[version-img]: https://img.shields.io/badge/version-in%20development-red.svg
[version-url]: https://github.com/SirSeim/SPFY

[build-img]: https://travis-ci.org/SirSeim/SPFY.svg?branch=master
[build-url]: https://travis-ci.org/SirSeim/SPFY

[codecov-img]: https://codecov.io/gh/SirSeim/SPFY/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/SirSeim/SPFY

[dependency-img]: https://david-dm.org/SirSeim/SPFY.svg
[dependency-url]: https://david-dm.org/SirSeim/SPFY

[dev-dependency-img]: https://david-dm.org/SirSeim/SPFY/dev-status.svg
[dev-dependency-url]: https://david-dm.org/SirSeim/SPFY?type=dev

[snyk-img]: https://snyk.io/test/github/SirSeim/SPFY.git/badge.svg
[snyk-url]: https://snyk.io/test/github/SirSeim/SPFY.git
