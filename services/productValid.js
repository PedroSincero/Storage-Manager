const productModel = require('../models/productModel');

const isNameExists = async (name) => {
  const teste = await productModel.getByName(name);
  if (!teste) return false;

  return true;
};
module.exports = {
  isNameExists,
};
