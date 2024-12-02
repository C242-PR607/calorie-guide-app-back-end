const db = require("../config/database");

class FoodModel {
  static find(limit, offset, search) {
    return new Promise((resolve, reject) => {
      if (search) {
        const sql = `SELECT id, FoodItem, FoodCategory, per100grams, Cals_per100grams, KJ_per100grams FROM foods WHERE FoodItem LIKE '%${search}%' ORDER BY FoodItem ASC LIMIT ${limit} OFFSET ${offset}`;
        db.query(sql, (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      } else {
        const sql = `SELECT id, FoodItem, FoodCategory, per100grams, Cals_per100grams, KJ_per100grams FROM foods ORDER BY FoodItem ASC LIMIT ${limit} OFFSET ${offset}`;
        db.query(sql, (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      }
    });
  }

  static count(search) {
    return new Promise((resolve, reject) => {
      if (search) {
        const sql = `SELECT COUNT(*) AS total FROM foods WHERE FoodItem LIKE '%${search}%'`;
        db.query(sql, (err, results) => {
          if (err) return reject(err);
          resolve(results[0].total);
        });
      } else {
        const sql = "SELECT COUNT(*) AS total FROM foods";
        db.query(sql, (err, results) => {
          if (err) return reject(err);
          resolve(results[0].total);
        });
      }
    });
  }

  static findByName(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT id, FoodItem, FoodCategory, per100grams, Cals_per100grams, KJ_per100grams FROM foods WHERE FoodItem = ? ORDER BY FoodItem ASC";
      db.query(sql, [name], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }
}

module.exports = FoodModel;
