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

[Read our Architecture Design](docs/Architecture_Design_Document.md)

[Read our Detailed Design Specification](docs/Detailed_Design_Specification.md)

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

configure database with user and database for project by having `config/create_spfy.sql`
```
CREATE USER {user} WITH PASSWORD '{password}';
CREATE DATABASE {db, default spfy} OWNER {user};
ALTER USER {user} WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE "{db, default spfy}" to "{user}";
```

configure server with database access by having `config/set_env.sh`
```
echo 'postgres://{user}:{password}@{host, default localhost}:{port, default 5432}/{db, default spfy}'
```

Alternately, get the most recent config folder from Team member/Slack.
The most recent config is from _Oct, 30_.

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
Reset Database (stop, initialize, start)
```
npm run db-reset
```

### Running & Development

Start server
```
npm start
```

Alternately, start server to auto restart when a file changes, _provided by [nodemon](https://github.com/remy/nodemon/)_
```
npm run nodemon
```

_Note that since_ `authorization` _now is partially functional, you will most likely have to login to try out the site._

Run Tests
```
npm test
npm run lint
```

To view a coverage report, run `npm test`, then `npm run report`, then open up `coverage/lcov-report/index.html` in a webbrowser

[version-img]: https://img.shields.io/badge/version-beta%202-yellow.svg
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
