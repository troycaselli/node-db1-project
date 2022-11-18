const router = require('express').Router();
const Accounts = require('./accounts-model');

router.get('/', async (req, res, next) => {
  const accounts = await Accounts.getAll();
  console.log(accounts);
})

router.get('/:id', async (req, res, next) => {
  const account = await Accounts.getById(req.params.id);
  console.log(account);
})

router.post('/', async (req, res, next) => {
  const newAccount = await Accounts.create(req.body);
  console.log(newAccount);
})

router.put('/:id', async (req, res, next) => {
  const updatedAccount = await Accounts.updateById(req.params.id, req.body);
  console.log(updatedAccount);
});

router.delete('/:id', async (req, res, next) => {
  const deletedAccount = await Accounts.deleteById(req.params.id);
  console.log(deletedAccount);
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
