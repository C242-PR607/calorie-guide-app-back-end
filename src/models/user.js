const db = require("../config/dbConnection");
const bcrypt = require("bcrypt");

class UserModel {
  static create(userData) {
    return new Promise(async (resolve, reject) => {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
      db.query(sql, [userData.email, hashedPassword], (err, results) => {
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

  static update(id, userData) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE users SET ? WHERE id = ?";
      db.query(sql, [userData, id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = UserModel;
