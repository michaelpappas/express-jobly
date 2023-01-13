"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate, sqlForFilter } = require("../helpers/sql");

/** Related functions for companies. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be {title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity }
   *
   * Throws BadRequestError if job already in database.
   * */

  static async create({ title, salary, equity, companyHandle }) {
    //TODO: what are we trying to check for duplicates
    // const duplicateCheck = await db.query(
    //   `SELECT company_handle
    //        FROM companies
    //        WHERE  = $1`,
    //   [handle]);

    // if (duplicateCheck.rows[0])
    //   throw new BadRequestError(`Duplicate company: ${handle}`);

    const result = await db.query(
      `INSERT INTO jobs(title, salary, equity, company_handle)
          VALUES ($1, $2, $3, $4)
           RETURNING id, title, salary, equity`,
      [
        title,
        salary,
        equity,
        companyHandle
      ],
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ id, title, salary, equity }, ...]
   * */

  static async findAll(filters = false) {
    let querySql = `SELECT id, title, salary, equity
                       FROM jobs
                       ORDER BY title`;
    let values;

    if (Object.keys(filters).length) {

      let { setCols, values } = sqlForFilter(
        filters,
        {
          title: "title",
          minSalary: "salary",
          hasEquity: "equity"
        }
      );

      querySql = `SELECT id, title, salary, equity
         FROM jobs
      WHERE ${setCols}
      ORDER BY title`;
    }


    const jobsRes = await db.query(
      querySql, values);

    return jobsRes.rows;
  }

  //   /** Filter all jobs.
  //    *
  //    * Will throw an error if minEmployees is greater than maxEmployees.
  //    *
  //    * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
  //    * */

  //   static async filterAll(filters) {

  //     const { minEmployees, maxEmployees } = filters;

  //     if (minEmployees > maxEmployees) {
  //       throw new BadRequestError("minEmployees cannot be greater than maxEmployees");
  //     }

  //     const { setCols, values } = sqlForFilter(
  //       filters,
  //       {
  //         minEmployees: "num_employees",
  //         maxEmployees: "num_employees",
  //         nameLike: "name"
  //       }
  //     );

  //     const querySql = `SELECT handle,
  //           name,
  //           description,
  //           num_employees AS "numEmployees",
  //           logo_url AS "logoUrl"
  //       FROM companies
  //       WHERE ${setCols}
  //       ORDER BY name`;

  //     const companiesRes = await db.query(
  //       querySql, values);

  //     return companiesRes.rows;
  //   }



  //   /** Given a company handle, return data about company.
  //    *
  //    * Returns { handle, name, description, numEmployees, logoUrl, jobs }
  //    *   where jobs is [{ id, title, salary, equity, companyHandle }, ...]
  //    *
  //    * Throws NotFoundError if not found.
  //    **/

  //   static async get(handle) {
  //     const companyRes = await db.query(
  //       `SELECT handle,
  //                 name,
  //                 description,
  //                 num_employees AS "numEmployees",
  //                 logo_url AS "logoUrl"
  //            FROM companies
  //            WHERE handle = $1`,
  //       [handle]);

  //     const company = companyRes.rows[0];

  //     if (!company) throw new NotFoundError(`No company: ${handle}`);

  //     return company;
  //   }

  //   /** Update company data with `data`.
  //    *
  //    * This is a "partial update" --- it's fine if data doesn't contain all the
  //    * fields; this only changes provided ones.
  //    *
  //    * Data can include: {name, description, numEmployees, logoUrl}
  //    *
  //    * Returns {handle, name, description, numEmployees, logoUrl}
  //    *
  //    * Throws NotFoundError if not found.
  //    */

  //   static async update(handle, data) {
  //     const { setCols, values } = sqlForPartialUpdate(
  //       data,
  //       {
  //         numEmployees: "num_employees",
  //         logoUrl: "logo_url",
  //       });
  //     const handleVarIdx = "$" + (values.length + 1);

  //     const querySql = `
  //       UPDATE companies
  //       SET ${setCols}
  //         WHERE handle = ${handleVarIdx}
  //         RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`;
  //     const result = await db.query(querySql, [...values, handle]);
  //     const company = result.rows[0];

  //     if (!company) throw new NotFoundError(`No company: ${handle}`);

  //     return company;
  //   }

  //   /** Delete given company from database; returns undefined.
  //    *
  //    * Throws NotFoundError if company not found.
  //    **/

  //   static async remove(handle) {
  //     const result = await db.query(
  //       `DELETE
  //            FROM companies
  //            WHERE handle = $1
  //            RETURNING handle`,
  //       [handle]);
  //     const company = result.rows[0];

  //     if (!company) throw new NotFoundError(`No company: ${handle}`);
  //   }
}

async function testJob() {
  const newJob = await Job.create({
    title: "newJob",
    salary: 5000,
    equity: .5,
    companyHandle: "anderson-arias-morrow"
  }
  );
  console.log(newJob);
}

testJob();

module.exports = Job;

