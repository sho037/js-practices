import {
  CREATE_BOOKS_TABLE_QUERY,
  INSERT_BOOK_QUERY,
  SELECT_BOOK_QUERY,
  DROP_BOOKS_TABLE_QUERY,
} from "./query.js";

import { runSQL, getSQL } from "./promise.js";

const BOOK = {
  title: "たった1日で基本が身に付く!Ruby on Rails超入門",
};

await runSQL(CREATE_BOOKS_TABLE_QUERY);
const response = await runSQL(INSERT_BOOK_QUERY, BOOK.title);
console.log(`Increment ID: ${response.statement.lastID}`);
const result = await getSQL(SELECT_BOOK_QUERY, response.statement.lastID);
process.stdout.write("Select Record: ");
console.log(result.row);
console.log(`Select Record: ${result.row}`);
await runSQL(DROP_BOOKS_TABLE_QUERY);
