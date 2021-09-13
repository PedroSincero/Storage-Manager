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
  const result = await db.collection('sales').find().toArray();
  console.log('join salesModel', result);
  if (!result) return null;
  return result;
};

const getById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const result = await db.collection('sales').findOne(ObjectId(id));
  return result === null;
};

const update = async (id, sales) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
   await db.collection('sales')
   .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sales } });
   const result = { _id: id, itensSold: sales };
   return result;
};

const exclude = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne(ObjectId(id));
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  console.log('exclude:', result);
  return result;
};

const getBySalesId = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const result = await db.collection('sales').findOne(ObjectId(id));
  return result;
};

module.exports = {
  add,
  getBySalesId,
  getById,
  getAll, 
  update, 
  exclude,
};