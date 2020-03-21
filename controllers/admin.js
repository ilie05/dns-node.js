/**
 * GET /
 * Home page.
 */
const path = require('path');


// exports.getAdmin = (req, res) => {
//   res.sendFile(path.join(__dirname, '../views', 'admin.html'));
// };

exports.getAdmin = (req, res) => {
  res.render('adminp', {
    title: 'Admin'
  });
};

exports.postAdmin = (req, res) => {
  console.log(req.body);
  res.send("Asdad");
  // res.render('adminp', { books: [{ name: 'asdasd' }, { name: 'asdas' }] });
};
