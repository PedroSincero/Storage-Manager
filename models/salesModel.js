const { ObjectId } = require('mongodb');
const connection = require('./connection');

 const add = async (sales) => {
  const db = await connection();
  const addSales = await db.collection('sales').insertOne({ itensSold: sales });
  const { itensSold } = addSales.ops[0];
  return { _id: addSales.insertedId, itensSold };
 };

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('sales').find.toArray();
  if (!result) return null;
  return result;
};

const getById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const result = await db.collection('sales').findOne(ObjectId(id));
  return result === null;
};

module.exports = {
  add,
  // getByName,
  getById,
  getAll, 
  // update, 
  // exclude,
};