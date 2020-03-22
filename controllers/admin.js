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
  Domain.findAll()
    .then((domains) => {
      res.render('admin', {
        title: 'Admin',
        domains
      });
    })
    .catch(() => {
      req.flash('errors', { msg: 'Domains couldn\'t be retrieved!' });
      res.render('admin', {
        title: 'Admin',
        domains: []
      });
    });
};

/**
 * POST /
 * Admin page.
 */

exports.postAdmin = (req, res) => {
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
  }).catch(() => {
    req.flash('errors', { msg: 'The record couldn\'t be saved' });
    res.redirect('/admin');
  });
};

/**
 * POST /
 * Delete Domain
 */

exports.deleteDomain = (req, res) => {
  const { id } = req.body;
  Domain.destroy({
    where: { id }
  }).then((noRowsDeleted) => {
    console.log(noRowsDeleted);
    req.flash('success', { msg: 'Your record has been deleted!' });
    res.redirect('/admin');
  }).catch(() => {
    req.flash('errors', { msg: 'The record couldn\'t be deleted' });
    res.redirect('/admin');
  });
};
