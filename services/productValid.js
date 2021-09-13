const Joi = require('joi');
const productModel = require('../models/productModel');

const isNameExists = async (name) => {
  const result = await productModel.getByName(name);
  return result;
};

const isIDExists = async (id) => {
  const result = await productModel.getById(id);
  return result;
};

const validparameters = (name, quantity) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).strict(),
  }).validate({ name, quantity });
  return error;
};

module.exports = {
  isNameExists,
  isIDExists,
  validparameters,
};
