const UsersModel = require('../../model/UsersModel');
const bcrypt = require('bcrypt');
async function index(req, res) {
  res.render('admin/home');
}
exports.index = index;
async function login(req, res) {
  res.render('admin/login');
}
exports.login = login;
async function check_user(req, res) {
  const email = req.body.email;
  const userPassword = req.body.password;
  console.log(bcrypt.hashSync(userPassword, 10));

  if (!email || !userPassword) {
    req.flash('error', 'Username and password are required');
    res.locals.message = req.flash();
    return res.render('admin/login');
  }

  let data = await UsersModel.getUsers(email);
  if (data) {
    const hashedPasswordFromDB = data.password;
    if (bcrypt.compareSync(userPassword, hashedPasswordFromDB)) {
      req.session.user = data;
      res.redirect('/admin');
    } else {
      req.flash('error', 'Invalid password');
      res.locals.message = req.flash();
      res.render('admin/login');
    }
  } else {
    req.flash('error', 'Invalid username');
    res.locals.message = req.flash();
    res.render('admin/login');
  }
}

exports.check_user = check_user;
async function logout(req, res) {
  req.session.destroy();
  res.redirect('/admin/login');
}
exports.logout = logout;

