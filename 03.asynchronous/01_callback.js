import sqlite3 from "sqlite3";

import {
  CREATE_BOOKS_TABLE_QUERY,
  INSERT_BOOK_QUERY,
  SELECT_BOOK_QUERY,
  DROP_BOOKS_TABLE_QUERY,
} from "./query.js";

const db = new sqlite3.Database(":memory:");

const BOOK = {
  title:
    "リーダブルコード ―より良いコードを書くためのシンプルで実践的なテクニック (Theory in practice) ",
};

db.run(CREATE_BOOKS_TABLE_QUERY, () => {
  db.run(INSERT_BOOK_QUERY, BOOK.title, function () {
    console.log(`Increment ID: ${this.lastID}`);
    db.get(SELECT_BOOK_QUERY, this.lastID, function (_, row) {
      process.stdout.write("Select Record: ");
      console.log(row);
      db.run(DROP_BOOKS_TABLE_QUERY);
    });
  });
});
