export function runSQL(db, sql, params) {
  return new Promise((resolve, reject) => {
    const callback = function (err) {
      if (err) {
        reject(err);
      }
      resolve(this);
    };
    if (params !== undefined) {
      db.run(sql, params, callback);
    } else {
      db.run(sql, callback);
    }
  });
}

export function getSQL(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, row) {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
}
