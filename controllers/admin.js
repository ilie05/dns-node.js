const validator = require('validator');
const Domain = require('../models/Domain');

// exports.getAdmin = (req, res) => {
//   res.sendFile(path.join(__dirname, '../views', 'admin.html'));
// };

/**
 * GET /
 * Admin page.
 */

exports.getAdmin = (req, res) => {
  res.render('adminp', {
    title: 'Admin',
    validate: validator.URL
  });
};

/**
 * POST /
 * Admin page.
 */

exports.postAdmin = (req, res, next) => {
  const { oldUrl, newUrl } = req.body;
  const validationErrors = [];

  if (!validator.isURL(oldUrl)) validationErrors.push({ msg: 'Please enter a valid old url.' });
  if (!validator.isURL(newUrl)) validationErrors.push({ msg: 'Please enter a valid new url.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/admin');
  }

  const domain = Domain.build({ oldDomain: oldUrl, newDomain: newUrl });
  domain.save().then(() => {
    req.flash('success', { msg: 'Success! Your record has been saved!' });
    res.redirect('/admin');
  }).catch((err) => next(err));

  // res.render('adminp', { books: [{ name: 'asdasd' }, { name: 'asdas' }] });
};
