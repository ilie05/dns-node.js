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
  facebook_id: {
    type: Sequelize.STRING,
  },
  google_id: {
    type: Sequelize.STRING,
  }
}, {
  // options
  sequelize,
  modelName: 'user'
});

User.beforeCreate(async (user) => {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});

User.sync();

module.exports = User;
