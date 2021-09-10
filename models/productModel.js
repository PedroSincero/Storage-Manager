const connection = require('./connection');
// const { ObjectId } = require('mongodb');

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

module.exports = {
  add,
  getByName,
  // getAll, getById, update, exclude
};