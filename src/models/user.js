const db = require("../config/database");
const bcrypt = require("bcrypt");

class UserModel {
  static create(payload) {
    return new Promise(async (resolve, reject) => {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
      db.query(sql, [payload.email, hashedPassword], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      db.query(sql, [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static update(payload, clause) {
    return new Promise((resolve, reject) => {
      const date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
      const sql = `UPDATE users SET ? , updated_at = ${JSON.stringify(date)} WHERE ?`;
      db.query(sql, [payload, clause], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static delete(clause) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM users WHERE ?";
      db.query(sql, [clause], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = UserModel;
