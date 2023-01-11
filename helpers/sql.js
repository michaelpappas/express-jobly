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

module.exports = { sqlForPartialUpdate };
