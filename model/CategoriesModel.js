const conn = require('../dbconfig');

async function insert(data) {
  return new Promise((resolve, reject) => {
    conn.query('INSERT INTO categories SET ?', data, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.insert = insert;

async function getAll(data) {
  return new Promise((resolve, reject) => {
    conn.query('select * from categories', (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.getAll = getAll;

async function remove(id) {
  return new Promise((resolve, reject) => {
    conn.query('delete from categories where id = ?', [id],(err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.remove = remove;

async function get(id) {
  return new Promise((resolve, reject) => {
    conn.query('select * from categories where id = ?', [id],(err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.get = get;

async function update(data) {
  return new Promise((resolve, reject) => {
    conn.query('update categories SET name = ? where id = ?', [data.name,data.id], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.update = update;
