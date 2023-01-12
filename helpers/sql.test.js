"use strict";

const { sqlForPartialUpdate } = require("./sql");

describe("testSqlForPartialUpdate", function () {
  const data = {
    username: "new",
    firstName: "Test",
    lastName: "Tester",
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
    }
    expect(result).toEqual(expectedResult);
  });

  // TODO: Check if it still works with just one key
});