"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn, ensureAdminUser, ensureUserOrAdmin } = require("../middleware/auth");
const { BadRequestError, UnauthorizedError } = require("../expressError");
const Job = require("../models/job");
const jobNewSchema = require("../schemas/jobNew.json");



const router = express.Router();


/** POST / { user }  => { user, token }
 *
 * Adds a new job.
 *
 * requires {title, salary, equity, company_handle}
 *
 * This returns the newly created job:
 *  {job: { id, title, salary, equity}}
 *
 * Authorization required: logged in and adminUser
 *
 **/

router.post("/", ensureLoggedIn, ensureAdminUser, async function (req, res, next) {
  const validator = jsonschema.validate(
    req.body,
    jobNewSchema,
    { required: true }
  );
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const job = await Job.create(req.body);
  return res.status(201).json({ job });
});


/** GET / => { jobs: [ { id, title, salary, equity }, ... ] }
 *
 * Returns list of all jobs.
 *
 * Authorization required: none
 **/

router.get("/", async function (req, res, next) {
  const jobs = await Job.findAll();
  return res.json({ jobs });
});

/** GET / => { jobs: [ { id, title, salary, equity }, ... ] }
 *
 * Returns list of all jobs.
 *
 * Authorization required: none
 **/

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  const job = await Job.get(id);
  return res.json({ job });
});

module.exports = router;
