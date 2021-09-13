const Joi = require('joi');
const salesModel = require('../models/salesModel');

const validQuantity = (quantity) => {
 const { error } = Joi.object({
  quantity: Joi.number().min(1).strict(),
 }).validate({ quantity });
 return error;
};

const isIDExists = async (id) => {
  // console.log('join SalesValid', id);
  const result = await salesModel.getById(id);
  return result;
};

module.exports = {
  validQuantity,
  isIDExists,
};