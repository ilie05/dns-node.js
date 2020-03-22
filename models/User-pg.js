const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const sequelize = require('../db/postrgesql-connect');

class User extends Sequelize.Model {
  gravatar(size) {
    console.log('gravatar function');
    if (!size) {
      size = 200;
    }
    if (!this.email) {
      return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
  }

  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
  }
}

User.init({
  // attributes
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
    // allowNull defaults to true
  },
  password: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  picture: {
    type: Sequelize.STRING,
  },
  facebook: {
    type: Sequelize.STRING,
  },
  google: {
    type: Sequelize.STRING,
  },
  tokens: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
}, {
  // options
  sequelize,
  modelName: 'user'
});

User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  }
});

User.sync();

module.exports = User;
