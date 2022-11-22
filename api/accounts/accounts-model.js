const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts')
}

const getById = (id) => {
  return db('accounts').where({id}).first()
}

const create = async (account) => {
  const {name, budget} = account
  const [resultId] = await db('accounts').insert({name: name.trim(), budget})
  return getById(resultId)
}

const updateById = async (id, account) => {
  await db('accounts').where({id}).update(account)
  return getById(id)
}

const deleteById = async (id) => {
  return db('accounts').where({id}).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
