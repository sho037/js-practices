import {
  CREATE_BOOKS_TABLE_QUERY,
  ERROR_INSERT_BOOK_QUERY,
  ERROR_SELECT_BOOK_QUERY,
  DROP_BOOKS_TABLE_QUERY,
} from "./query.js";

import { runSQL, getSQL } from "./promise.js";

const BOOK = {
  title: "たった1日で基本が身に付く!Go言語超入門",
};

await runSQL(CREATE_BOOKS_TABLE_QUERY);
try {
  await runSQL(ERROR_INSERT_BOOK_QUERY, BOOK.title);
} catch (err) {
  console.log(err);
}
try {
  await getSQL(ERROR_SELECT_BOOK_QUERY, "non_existent_id");
} catch (err) {
  console.log(err);
}
await runSQL(DROP_BOOKS_TABLE_QUERY);
