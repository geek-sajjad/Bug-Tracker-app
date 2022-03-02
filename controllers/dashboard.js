exports.getDashboard = (req, res, next) => {
    res.render('dashboard/index.ejs', {
        docTitle: 'Dasboard'
    });
}