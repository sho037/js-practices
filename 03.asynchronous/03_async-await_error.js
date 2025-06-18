import {
  CREATE_BOOKS_TABLE_QUERY,
  ERROR_INSERT_BOOK_QUERY,
  ERROR_SELECT_BOOK_QUERY,
  DROP_BOOKS_TABLE_QUERY,
} from "./query.js";

import { runSQL, runSQLWithParams, getSQL } from "./promise.js";

const BOOK = {
  title: "たった1日で基本が身に付く!Go言語超入門",
};

await runSQL(CREATE_BOOKS_TABLE_QUERY);
try {
  await runSQLWithParams(ERROR_INSERT_BOOK_QUERY, BOOK.title);
} catch (err) {
  console.error(err);
}
try {
  await getSQL(ERROR_SELECT_BOOK_QUERY, "?");
} catch (err) {
  console.error(err);
}
await runSQL(DROP_BOOKS_TABLE_QUERY);
