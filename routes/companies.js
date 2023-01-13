"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureAdminUser } = require("../middleware/auth");
const Company = require("../models/company");
const db = require("../db");

const companyNewSchema = require("../schemas/companyNew.json");
const companyUpdateSchema = require("../schemas/companyUpdate.json");
const companyFilterSchema = require("../schemas/companyFilter.json");
const Job = require("../models/job");

const router = new express.Router();


/** POST / { company } =>  { company }
 *
 * company should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: login, adminUser
 */

router.post("/", ensureLoggedIn, ensureAdminUser, async function (req, res, next) {
  const validator = jsonschema.validate(
    req.body,
    companyNewSchema,
    { required: true }
  );
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const company = await Company.create(req.body);
  return res.status(201).json({ company });
});

/** GET /  =>
 *   { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
 *
 * Can filter on provided search filters:
 * - minEmployees
 * - maxEmployees
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 *
 * TODO: Combine our static method so we only have one static method in this
 *       route.
 */

router.get("/", async function (req, res, next) {
  let companies;

  // NOTE: req.query is an immutable object!!!

  // TODO: remove after done testing db console.log(await db.query(`SELECT * FROM cats`))

  const q = req.query;

  if (Object.keys(req.query).length) {

    if (req.query.minEmployees !== undefined) {
      q.minEmployees = Number(q.minEmployees);
    }

    if (q.maxEmployees !== undefined) {
      q.maxEmployees = Number(q.maxEmployees);
    }

    const result = jsonschema.validate(
      q,
      companyFilterSchema,
      { required: true }
    );

    if (!result.valid) {
      const errs = result.errors.map(err => err.stack);
      throw new BadRequestError(errs);
    }

    companies = await Company.filterAll(q);
  } else {
    companies = await Company.findAll();
  }

  return res.json({ companies });
});

/** GET /[handle]  =>  { company }
 *
 *  Company is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 * Authorization required: none
 */

router.get("/:handle", async function (req, res, next) {
  const company = await Company.get(req.params.handle);
  const jobs = await Job.findAll({ companyHandle: company.handle });
  return res.json({ company, jobs });
});

/** PATCH /[handle] { fld1, fld2, ... } => { company }
 *
 * Patches company data.
 *
 * fields can be: { name, description, numEmployees, logo_url }
 *
 * Returns { handle, name, description, numEmployees, logo_url }
 *
 * Authorization required: login, adminUser
 */

router.patch("/:handle", ensureLoggedIn, ensureAdminUser, async function (req, res, next) {
  const validator = jsonschema.validate(
    req.body,
    companyUpdateSchema,
    { required: true }
  );
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const company = await Company.update(req.params.handle, req.body);
  return res.json({ company });
});

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization required: login, adminUser
 */

router.delete("/:handle", ensureLoggedIn, ensureAdminUser, async function (req, res, next) {
  await Company.remove(req.params.handle);
  return res.json({ deleted: req.params.handle });
});


module.exports = router;
