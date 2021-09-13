const Joi = require('joi');
const salesModel = require('../models/salesModel');

const validQuantity = (quantity) => {
 const { error } = Joi.object({
  quantity: Joi.number().min(1).strict(),
 }).validate({ quantity });
 return error;
};

const isIDExists = async (id) => {
  const result = await salesModel.getById(id);
  return result;
};

const isValidID = async (id) => {
  const result = await salesModel.getBySalesId(id);
  return result;
};

module.exports = {
  validQuantity,
  isIDExists,
  isValidID,
};