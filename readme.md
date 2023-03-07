# Jobly Backend

# RESTful API Node Express

A RESTful job search API using Node.js and Postgresql

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/michaelpappas/express-jobly
cd express-jobly
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:
(note defaults are present in code if you don't create a .env)
```bash
touch .env
# open .env and modify the environment variables
```

## Table of Contents

- [Commands](#commands)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Commands

Running in development:

```bash
npm start
# or
npm run dev
```

## Project Structure

```
helpers\                # Helpers folder
 |--sql.js              # sql helper functions
 |--sql.test.js         # tests for sql helper functions
 |--tokens.js           # tokens helper functions
 |--tokens.test.js      # tests for tokens helper functions

middleware\             # Middleware folder
 |--auth.js             # authorization middleware
 |--auth.test.js        # tests for authorization middleware

models\                 # Models folder
 |--company.js          # companies database models
 |--company.test.js     # tests for companies database models
 |--job.js              # job database models
 |--job.test.js         # tests for job database models
 |--user.js             # user database models
 |--user.test.js        # tests for user database models

routes\                 # Routes folder
 |--auth.js             # authorization routes
 |--auth.test.js        # tests for authorization routes
 |--companies.js        # companies routes
 |--companies.test.js   # tests for companies routes
 |--jobs.js             # jobs routes
 |--users.js            # users routes
 |--users.test.js       # tests for users routes

schemas\                # JSON Schema folder
 |--companyFilter.json  # schema for company queries
 |--companyNEW.json     # schema for new companies
 |--companyUpdate.json  # schema for companie updates
 |--jobNew.json         # scema for new jobs
 |--userAuth.json       # schema for user authorization
 |--userNew.json        # schema for new users (admin created)
 |--userRegister.json   # schema for user register
 |--userUpdate.json     # schema for user update


\                       # Root folder
 |--app.js              # main routes scripts
 |--app.test.js         # main routes tests
 |--config.js           # app configuration
 |--config.test.js      # app configuration tests
 |--db.js               # db setup
 |--jobly-schema.sql    # db schema setup
 |--jobly-seed.sql      # db seed data
 |--package.json        # node dependencies
 |--readme.md           # project readme
 |--server.js           # server setup
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST auth/token` - Signin\
`POST auth/register` - Signup\

**Users routes**:\
`POST users/` - Create a user(not register - admin only)\
`GET users` - Get all users(admin only)\
`GET users/:username` - Get user(admin only)\
`PATCH users/:username` - Update user(admin only)\
`DELETE users/:userId` - Delete user(admin only or user)

**Companies routes**:\
`POST companies/` - Create a new company(admin only)\
`GET companies/` - Get all companies\
`GET companies/:handle` - Get company\
`PATCH companies/:handle` - Edit Company data\
`DELETE companies/:handle` - Delete Company\

**Jobs routes**:\
`POST jobs/` - Create a new job(admin only)\
`GET jobs/` - Get all jobs\
`GET jobs/:handle` - Get company\



