exports.getLogin = (req, res, next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/');
    }
    res.render('auth/login', {
        docTitle: 'Login'
    });
}

exports.postLogin = (req, res, next) => {
    console.log(req.body);
    req.session.isLoggedIn = true;
    
    res.redirect('/dashboard');
}

exports.getSingup = (req, res, next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/');
    }
    res.render('auth/signup', {
        docTitle: 'signup'
    });
}

exports.postSignup = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/dashboard');
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}