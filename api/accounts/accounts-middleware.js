const Accounts = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body;
  if(name === undefined || budget === undefined) {
    next({status: 400, message: 'name and budget are required'});
  } else if(name.trim().length < 3 || name.trim().length > 100) {
    next({status: 400, message: 'name of account must be between 3 and 100'});
  } else if(isNaN(parseInt(budget))) {
    next({status: 400, message: 'budget of account must be a number'});
  } else if(parseInt(budget) < 0 || parseInt(budget) > 1000000) {
    next({status: 400, message: 'budget of account is too large or too small'});
  } else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const existing = await db('accounts').where('name', req.body.name.trim()).first()
  if(existing) {
    next({status: 400, message: 'that name is taken'});
  } else {
    next();
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id);
    if(!account) {
      next({status: 404, message: 'account not found'});
    } else {
      req.account = account;
      next();
    }
  } catch(err) {
    next(err);
  }
}
