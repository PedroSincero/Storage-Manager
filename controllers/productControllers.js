// const express = require('express');
const Joi = require('joi');
const productModel = require('../models/productModel');
const { isNameExists } = require('../services/productValid');

const add = async (req, res) => {
  const { name, quantity } = req.body;

  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).strict(),
  }).validate({ name, quantity });

  if (error) {
  return res.status(422).json({ err: { code: 'invalid_data',
  message: error.details[0].message,
  } });
}

  if (isNameExists(name)) {
    return res.status(422).json({ err: { code: 'invalid_data',
   message: 'Product already exists',
    } }); 
  } 
  
const newProduct = await productModel.add(name, quantity);
  return res.status(200).json(newProduct);
};

module.exports = { add };
