const productModel = require('../models/productModel');

const isNameExists = async (name) => {
  const result = await productModel.getByName(name);
  return result;
};

const isIDExists = async (id) => {
  const result = await productModel.getById(id);
  return result;
};

module.exports = {
  isNameExists,
  isIDExists,
};
