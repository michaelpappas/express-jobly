# Jobly Backend

# RESTful API Node Express Mongoose Example

The project builds RESTful APIs using Node.js and Postgresql

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

```bash
cp .env.example .env
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
 |--sql.js              # Static html
 |--sql.test.js         # Static html
 |--tokens.js           # Static html
 |--tokens.test.js      # Static html

middleware\             # Middleware folder
 |--auth.js             # Static html
 |--auth.test.js        # Static html

models\                 # Models folder
 |--company.js          # Static html
 |--company.test.js     # Static html
 |--job.js              # Static html
 |--job.test.js         # Static html
 |--user.js             # Static html
 |--user.test.js        # Static html

routes\                 # Routes folder
 |--auth.js             # Static html
 |--auth.test.js        # Static html
 |--companies.js        # Static html
 |--companies.test.js   # Static html
 |--jobs.js             # Static html
 |--users.js            # Static html
 |--users.test.js       # Static html

schemas\                # Schemas folder
 |--companyFilter.json  # Static html
 |--companyNEW.json     # Static html
 |--companyUpdate.json  # Static html
 |--jobNew.json         # Static html
 |--userAuth.json       # Static html
 |--userNew.json        # Static html
 |--userRegister.json   # Static html
 |--userUpdate.json     # Static html


\                       # Root folder
 |--app.js              # Environment variables and configuration
 |--app.test.js         # Controllers
 |--config.js           # Custom express middlewares
 |--config.test.js      # Mongoose models
 |--db.js               # Routes
 |--jobly-schema.sql    # Business logic
 |--jobly-seed.sql      # Utility classes and functions
 |--package.json        # Request data validation schemas
 |--readme.md           # App entry point
 |--server.js           # App entry point
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



