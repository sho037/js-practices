import {
  CREATE_BOOKS_TABLE_QUERY,
  ERROR_INSERT_BOOK_QUERY,
  ERROR_SELECT_BOOK_QUERY,
  DROP_BOOKS_TABLE_QUERY,
} from "./query.js";

import { runSQL, runSQLWithParams, getSQL } from "./promise.js";

const BOOK = {
  title: "ゼロからわかるRuby超入門",
};

runSQL(CREATE_BOOKS_TABLE_QUERY).then(() => {
  runSQLWithParams(ERROR_INSERT_BOOK_QUERY, BOOK.title)
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      getSQL(ERROR_SELECT_BOOK_QUERY, "?")
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          runSQL(DROP_BOOKS_TABLE_QUERY);
        });
    });
});
