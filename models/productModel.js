const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (name, quantity) => {
 const db = await connection();
 const addProduct = await db.collection('products').insertOne({ name, quantity });
 const product = addProduct.ops[0];
 return product;
};

const getByName = async (name) => {
  const db = await connection();
  const addProduct = await db.collection('products').findOne({ name });
  return addProduct !== null;
};

const getById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const result = await db.collection('products').findOne(ObjectId(id));
  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  if (!result) return null;
  return result;
};

const exclude = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const productID = await getById(id);
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return productID;
};

module.exports = {
  add,
  getByName,
  getById,
  getAll, 
  // update, 
  exclude,
};