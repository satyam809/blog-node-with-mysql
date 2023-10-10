const conn = require('../dbconfig')

async function getUsers(email) {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (result.length > 0) {
            resolve(result[0]); // Resolve with the first user found
          } else {
            resolve(null); // Resolve with null if no user found
          }
        }
      });
    });
  }
exports.getUsers = getUsers;