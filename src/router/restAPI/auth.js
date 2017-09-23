import request from 'request'
import atob from 'atob'
import colors from 'colors'

import dbModel from '../../database/establishment'

let sequelize = () => dbModel.getSequelize();

let getFacebookAppID = (req, res, next) => {
  return res.status(200).json(process.env.facebook_app_id);
};

let login = (req, res, next) => {
  const Account = dbModel.getDefineModel().Account;

  return sequelize().transaction({autocommit: false}, t =>
    Account.findOne({
      attributes: ['name', 'role_id'],
      where: {
        $and: [
          { email: req.body.account },
          { password: req.body.password },
          { deleted_at: null }
        ]
      },
      raw: true,
      transaction: t
    })
  )
  .then(account => {
    if(account){
      req.session.role = account.role_id;
      res.cookie( 'name', account.name, { httpOnly: true } );
    }

    return res.redirect('/');
  });
};

let isLogin = (req, res) => {
  let isLogin = Object.keys(req.cookies).indexOf('name') > -1 ? 'login' : 'no login';
  return res.status(200).json(isLogin);
};

module.exports = {
  login: login,
  isLogin: isLogin,
  getFacebookAppID: getFacebookAppID
};