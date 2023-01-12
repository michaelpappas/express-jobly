"use strict";

const { BadRequestError } = require("../expressError");
const { sqlForPartialUpdate, sqlForFilter } = require("./sql");

describe("testSqlForPartialUpdate", function () {
  const data = {
    username: "new",
    firstName: "Test",
    lastName: "Tester",
  };

  const dataOneKey = {
    username: "Tester",
  };

  const jsToSql = {
    username: "username",
    firstName: "first_name",
    lastName: "last_name",
  };

  test("correct result on three keys", function () {
    const result = sqlForPartialUpdate(data, jsToSql);
    const expectedResult = {
      setCols: '"username"=$1, "first_name"=$2, "last_name"=$3',
      values: ['new', 'Test', 'Tester']
    };
    expect(result).toEqual(expectedResult);
  });

  test("correct result on one key", function () {

    const result = sqlForPartialUpdate(dataOneKey, jsToSql);
    const expectedResult = {
      setCols: '"username"=$1',
      values: ['Tester']
    };
    expect(result).toEqual(expectedResult);
  });
});

describe("testSqlForPartialUpdate", function () {

  const emptyData = {};

  test("fail with empty filter data", function () {
    try {
      const result = sqlForFilter(emptyData, emptyData);
    }
    catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });

});