const db = require('../../data/db-config');

const getAll = async () => {
  const result = db('accounts')
  return result
}

const getById = async (id) => {
  const result = db('accounts').where({id}).first()
  return result
}

const create = async (account) => {
  const {name, budget} = account
  const [resultId] = await db('accounts').insert({name: name.trim(), budget})
  const result = getById(resultId)
  return result
}

const updateById = async (id, account) => {
  await db('accounts').where({id}).update(account)
  const result = getById(id)
  return result
}

const deleteById = async (id) => {
  const toBeDeleted = getById(id)
  await db('accounts').where({id}).del()
  return toBeDeleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
