<h1 align="center">
  <img alt="Logo" src="https://imperadorxs-images.s3.amazonaws.com/todo-api.png" width="800px"/>
</h1>

<h3 align="center">
  API to register tasks todo
</h3>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/imperadorxs/todo-api">

  <a href="https://www.linkedin.com/in/imperadorxs/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Allan%20Santiago-%20">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/imperadorxs/todo-api">

  <a href="https://github.com/imperadorxs/todo-api/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/imperadorxs/todo-api">
  </a>

  <a href="https://github.com/imperadorxs/todo-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/imperadorxs/todo-api">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/imperadorxs/todo-api">
</p>

<p align="center">
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>


## 👨🏻‍💻 About the project

This API allows you to create a user and log in, create lists and tasks, in addition to creating tasks for the current day or independent tasks.
Project developed using TDD, in addition to being developed based on 3 entities, User, Task, List.

## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://hub.docker.com/_/redis)
- [Date-fns](https://date-fns.org/)
- [Nodemailer](https://nodemailer.com/)
- [ethereal](https://ethereal.email/)
- [handlebars](https://handlebarsjs.com/)
- [multer](https://github.com/expressjs/multer)
- [celebrate](https://github.com/arb/celebrate)
- [class-transformer](https://github.com/typestack/class-transformer)
- [rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example)
- [Jest](https://jestjs.io/)
- [Babel](https://babeljs.io/setup)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Getting started

Import the `Insomnia.json` on Insomnia App

### Requirements

- [Docker](https://www.docker.com/)
- [Node](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)

**Clone the project and access the folder**

```bash
$ git clone https://github.com/imperadorxs/todo-api && cd todo-api
```

**Follow the steps below**

```bash

# Create a docker container postgres
# For your security change the username and password
# if your have other container using postres change the first external port to 5436 or greather
$ docker run -d --name postgresql -e POSTGRESQL_PASSWORD=your_password -e POSTGRESQL_USERNAME=your_user -e POSTGRESQL_DATABASE=todo-api -p 5432:5432 postgres

# Create a docker container redis
# For your security change the username and password
# if your have other container using redis change the first external port to 6380 or greather
$ docker run -d --name redis -e REDIS_PASSWORD=your_password -p 6379:6379 redis:alpine

# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with your environment variables
# remenber generate an md5 code at http://www.md5.cz/ and change the variable APP_SECRET

$ cp .env.example .env

# Make a copy of 'ormconfig.example.json' to 'ormconfig.json'
# and set with your database variables

$ cp ormconfig.example.json ormconfig.json

# Run the migrations and seeds
$ yarn typeorm migration:run

# Run this command to start the server in development mode
$ yarn dev:server

# to generate your build
# when you generate build remenber for change src to dist and ts to js in ormconfig.json
$ yarn build

# start aplication *NEED BUILD *
$ yarn start

# Well done, project is started!
```
## 👨🏻‍💻 Endpoints

# User
- /users: [ POST ] Sign up to create a new user.
- /users/avatar: [ PUT ] To change a profile image.
- /password/forgot: [ POST ] To generate a new token to reset password.
- /password/reset: [ POST ] To use a token for reset password.
- /profile: [ GET ] To get user profile data.
- /profile: [ PUT ] To update use profile data.
- /sessions: [ POST ] Sign in to get the access token.

# Lists
- /lists: [ GET ] Get all user lists.
- /lists: [ POST ] Create a new list.
- /lists: [ DEL ] Delete one user list.
- /lists: [ PUT ] Update one user list.

# Tasks
- /tasks: [ GET ] Get all user tasks.
- /tasks/today: [ GET ] Get all user today tasks.
- /tasks: [ POST ] Create a new task.
- /tasks: [ DEL ] Delete one task.
- /tasks: [ PUT ] Update one task.


## 🤔 How to contribute

- **Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork imperadorxs/todo-api
```

```bash
# Clone your fork
$ git clone your-fork-url && cd todo-api

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜&nbsp; by Allan Santiago 👋 [See my linkedin](https://www.linkedin.com/in/imperadorxs/)
