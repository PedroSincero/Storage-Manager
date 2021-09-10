const productModel = require('../models/productModel');

const isNameExists = async (name) => {
  const teste = await productModel.getByName(name);
  return teste;
};
module.exports = {
  isNameExists,
};
