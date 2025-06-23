import {
  CREATE_BOOKS_TABLE_QUERY,
  INSERT_BOOK_QUERY,
  SELECT_BOOK_QUERY,
  DROP_BOOKS_TABLE_QUERY,
} from "./query.js";

import { runSQL, getSQL } from "./promise.js";

const BOOK = {
  title:
    "体系的に学ぶ 安全なWebアプリケーションの作り方 第2版 脆弱性が生まれる原理と対策の実践",
};

runSQL(CREATE_BOOKS_TABLE_QUERY).then(() => {
  runSQL(INSERT_BOOK_QUERY, BOOK.title).then(({ statement }) => {
    console.log(`Increment ID: ${statement.lastID}`);
    getSQL(SELECT_BOOK_QUERY, statement.lastID).then(({ row }) => {
      console.log(`Select Record: ${JSON.stringify(row)}`);
      runSQL(DROP_BOOKS_TABLE_QUERY);
    });
  });
});
