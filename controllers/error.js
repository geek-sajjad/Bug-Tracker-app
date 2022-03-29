exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    docTitle: '404 not found',
  });
};

exports.get500 = (err, req, res, next) => {
  console.error(err);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ status: 400, message: err.message });
  }
  res.status(500).render('500', {
    docTitle: '500 server error',
  });
};
