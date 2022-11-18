const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body;
  if(!name || !budget) {
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
  const results = await Accounts.getAll();
  if(results.find(result => result.name === req.body.name)) {
    next({status: 400, message: 'that name is taken'});
  } else {
    next();
  }
}

exports.checkAccountId = async (req, res, next) => {
  const account = await Accounts.getById(req.params.id);
  if(!account) {
    next({status: 404, message: 'account not found'});
  } else {
    next();
  }
}
