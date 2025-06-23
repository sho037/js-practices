import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

export function runSQL(sql, params) {
  return new Promise((resolve, reject) => {
    const callback = function (err) {
      if (err) reject(err);
      resolve({ statement: this });
    };
    if (params !== undefined) {
      db.run(sql, params, callback);
    } else {
      db.run(sql, callback);
    }
  });
}

export function getSQL(sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, row) {
      if (err) reject(err);
      resolve({ statement: this, row });
    });
  });
}
