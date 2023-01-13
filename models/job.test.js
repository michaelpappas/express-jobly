"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        id: 1,
        title: "j1",
        salary: 1,
        equity: 0
      },
      {
        id: 2,
        title: "j2",
        salary: 2,
        equity: .2
      },
      {
        id: 3,
        title: "j3",
        salary: 3,
        equity: .3
      }
    ]);
  });

  test("works: with filtering min salary", async function () {
    let companies = await Job.filterAll({ minSalary: 2 });
    expect(companies).toEqual([
      {
        id: 2,
        title: "j2",
        salary: 2,
        equity: .2
      },
      {
        id: 3,
        title: "j3",
        salary: 3,
        equity: .3
      }
    ]);
  });
  test("works: with filtering min salary and has equity", async function () {
    let companies = await Job.filterAll({ minSalary: 3, hasEquity: true });
    expect(companies).toEqual([
      {
        id: 3,
        title: "j3",
        salary: 3,
        equity: .3
      }
    ]);
  });

  test("works: with filtering has no equity", async function () {
    let companies = await Job.filterAll({ hasEquity: false });
    expect(companies).toEqual([
      {
        id: 1,
        title: "j1",
        salary: 1,
        equity: 0
      }
    ]);
  });

  test("works: with filtering title", async function () {
    let companies = await Job.filterAll({ title: "j3" });
    expect(companies).toEqual([
      {
        id: 3,
        title: "j3",
        salary: 3,
        equity: .3
      }
    ]);
  });

  test("works: query returns no results", async function () {
    let companies = await Job.filterAll({ title: "nope" });
    expect(companies).toEqual([]);
  });
});

/************************************** create */

describe("create", function () {
  const newJob = {
    title: "j4",
    salary: 4,
    equity: .4,
    companyHandle: "c3"
  };

  test("works", async function () {
    let job = await Job.create(newJob);


    expect(job).toEqual({
      id: expect.any(Number),
      title: "j4",
      salary: 4,
      equity: .4
    });

    const result = await db.query(
      `SELECT id, title, salary, equity
           FROM jobs
           WHERE company_handle = 'c3' AND salary = 4`);
    expect(result.rows).toEqual([
      {
        id: expect.any(Number),
        title: "j4",
        salary: 4,
        equity: .4
      },
    ]);
  });

  test("bad request with dupe", async function () {
    try {
      await Job.create(newJob);
      await Job.create(newJob);
      throw new Error("fail test, you shouldn't get here");
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

// /************************************** update */

// describe("update", function () {
//   const jobData = {
//     id: 3,
//     title: "j3",
//     salary: 3,
//     equity: .3
//   };

//   test("works", async function () {
//     let company = await Company.update("c1", updateData);
//     expect(company).toEqual({
//       handle: "c1",
//       ...updateData,
//     });

//     const result = await db.query(
//       `SELECT handle, name, description, num_employees, logo_url
//            FROM companies
//            WHERE handle = 'c1'`);
//     expect(result.rows).toEqual([{
//       handle: "c1",
//       name: "New",
//       description: "New Description",
//       num_employees: 10,
//       logo_url: "http://new.img",
//     }]);
//   });

// });