/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('admin', {
    title: 'Admin'
  });
};
