exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
        docTitle: '404 not found',
    });
}

exports.get500 = (err, req, res, next) => {
    console.log(err.message);
    console.log(err.status);
    res.status(500).render('500', {
        docTitle: '500 server error',
    });
}