// const express = require('express');
const Joi = require('joi');
const productModel = require('../models/productModel');
const { isNameExists, isIDExists } = require('../services/productValid');

const add = async (req, res) => {
  const { name, quantity } = req.body;
  const isExist = await isNameExists(name);

  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).strict(),
  }).validate({ name, quantity });

  if (error) {
    return res.status(422).json({ err: { code: 'invalid_data',
    message: error.details[0].message,
    } });
  }
  if (isExist) {
    return res.status(422).json({ err: { code: 'invalid_data',
   message: 'Product already exists',
    } }); 
  } 
  
const newProduct = await productModel.add(name, quantity);
  return res.status(201).json(newProduct);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const isExist = await isIDExists(id);
  
  if (!isExist) {
    return res.status(422).json({ err: { code: 'invalid_data',
   message: 'Wrong id format',
    } }); 
  } 
  
  const productID = await productModel.getById(id);
  console.log('ID invalido', productID);
  return res.status(200).json(productID);
};

const getAll = async (_req, res) => {
  const productAll = await productModel.getAll();

  if (!productAll) return res.status(404).json('deu ruim');
  return res.status(200).json(productAll);
};

module.exports = { add, getById, getAll };
