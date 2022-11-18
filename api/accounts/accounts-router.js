const router = require('express').Router();
const Accounts = require('./accounts-model');
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  const accounts = await Accounts.getAll();
  console.log(accounts);
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  const account = await Accounts.getById(req.params.id);
  console.log(account);
})

router.post(
  '/', 
  checkAccountPayload, 
  checkAccountNameUnique, 
  async (req, res, next) => {
    const newAccount = await Accounts.create(req.body);
    console.log(newAccount);
  }
);

router.put(
  '/:id', 
  checkAccountPayload, 
  checkAccountId, 
  checkAccountNameUnique, 
  async (req, res, next) => {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body);
    console.log(updatedAccount);
  }
);

router.delete('/:id', checkAccountId, async (req, res, next) => {
  const deletedAccount = await Accounts.deleteById(req.params.id);
  console.log(deletedAccount);
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({message: err.message || 'Something went terribly wrong'});
})

module.exports = router;
