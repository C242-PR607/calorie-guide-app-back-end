const db = require("../config/database");

class PredictModel {
  static create(payload) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO predictions SET ?`;
      db.query(sql, [payload], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = PredictModel;
