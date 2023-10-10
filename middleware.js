exports.checkAuth = (adminUrl) => {
    return (req, res, next) => {
      if (req.session) {
        LoginUser = req.session.user;
        if (LoginUser) {
          next();
        } else {
          res.redirect(adminUrl + "/login");
        }
      } else {
        res.redirect(adminUrl + "/login");
      }
    };
  }