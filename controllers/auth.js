const passport = require('passport');

exports.getLogin = (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('auth/login', {
    docTitle: 'Login',
    message: req.flash('loginMessage'),
  });
};

// exports.postLogin = (req, res, next) => {
//     res.redirect('/dashboard');
// }

exports.getSingup = (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('auth/signup', {
    docTitle: 'signup',
    message: req.flash('signupMessage'),
    oldInput: {
      email: '',
      password: '',
      name: '',
    },
  });
};

exports.postSignup = (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) return next(err);
    const { email, name, password } = req.body;

    if (!user) {
      return res.render('auth/signup', {
        docTitle: 'signup',
        message: req.flash('signupMessage'),
        oldInput: {
          name: name,
          email: email,
          password: password,
        },
      });
    }

    req.logIn(user, err => {
      if (err) return next(err);
      return res.redirect('/dashboard');
    });
  })(req, res, next);
};

exports.postLogout = (req, res, next) => {
  req.logout();
  return res.redirect('/');
  // req.session.destroy(err => {
  //     res.redirect('/');
  // });
};
