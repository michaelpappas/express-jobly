const { BadRequestError } = require("../expressError");

/**
 *  Takes two inputs: dataToUpdate and jsToSql
 *    - dataToUpdate: An object with key value pairs of columns we want to update
 *    - jsToSql: Converts camelCase to snakeCase to match db column names
 *
 *  Returns an object with setCols and values keys
 *    - setCols: It's a string representing the the variables and the indexes of
 *               the prepared statement.
 *    - values:  The actual data to insert into the prepared statement.
 *
 *  Example return: {
      setCols: '"handle"=$1, "name"=$2, "logo_url"=$3, "description"=$4, "num_employees"=$5',
      values: [ 'new', 'New', 'http://new.img', 'DescNew', 10 ]
    }
 *
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  console.log("object.keys(dataToUpdate- ", Object.keys(dataToUpdate));
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
    `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

/**
 *  Takes two inputs: filterData and jsToSql
 *    - filterData: An object with key value pairs of columns we want to filter
 *    - jsToSql: Converts camelCase to snakeCase to match db column names
 *
 *  Returns an object with setCols and values keys
 *    - setCols: A string representing the the variables and the indexes of
 *               the prepared statement.
 *    - values:  The actual data to insert into the prepared statement.
 *
 *  Example return: {
      setCols: '"name ILIKE $1 AND "num_employees" <= $2"'
      values: [ '%c%', 2 ]
    }
 *
 */

function sqlForFilter(filterData, jsToSql) {

  if (filterData.nameLike) {
    filterData.nameLike = `%${filterData.nameLike}%`;
  }

  if (filterData.title) {
    filterData.title = `%${filterData.title}%`;
  }

  const keys = Object.keys(filterData);

  if (keys.length === 0) throw new BadRequestError("No data");

  const cols = [];
  let idx = 0;

  if (filterData.nameLike) {
    cols.push(`${jsToSql["nameLike"]} ILIKE $${idx + 1}`);
    idx++;
  }

  if (filterData.minEmployees) {
    cols.push(`${jsToSql["minEmployees"]} >= $${idx + 1}`);
    idx++;
  }

  if (filterData.maxEmployees) {
    cols.push(`${jsToSql["maxEmployees"]} <= $${idx + 1}`);
    idx++;
  }

  if (filterData.minSalary) {
    cols.push(`${jsToSql["minSalary"]} >= $${idx + 1}`);
    idx++;
  }

  if (filterData.hasEquity === "true") {
    cols.push(`${jsToSql["hasEquity"]} > 0`);
  }

  if (filterData.title) {
    cols.push(`${jsToSql["title"]} ILIKE $${idx + 1}`);
    idx++;
  }
  if (filterData.companyHandle) {
    cols.push(`${jsToSql["companyHandle"]} = $${idx + 1}`);
    idx++;
  }
  debugger;

  delete filterData.hasEquity;

  return {
    setCols: cols.join(" AND "),
    values: Object.values(filterData),
  };
}

module.exports = { sqlForPartialUpdate, sqlForFilter };
