import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

export function runSQL(sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

export function runSQLWithParams(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      resolve({ statement: this });
    });
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
