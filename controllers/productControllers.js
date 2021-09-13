// const express = require('express');
const productModel = require('../models/productModel');
const { isNameExists, isIDExists, 
  validparameters } = require('../services/productValid');

const add = async (req, res) => {
  const { name, quantity } = req.body;
  const isExist = await isNameExists(name);
  const error = validparameters(name, quantity);

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
  return res.status(200).json(productID);
};

const getAll = async (_req, res) => {
  const productAll = await productModel.getAll();
  return res.status(200).json({ products: productAll });
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const productExclude = await productModel.exclude(id);

  if (!productExclude) {
 return res.status(422).json({ err: { code: 'invalid_data',
  message: 'Wrong id format',
   } }); 
}

  return res.status(200).json(productExclude);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const error = validparameters(name, quantity);

  if (error) {
    return res.status(422).json({ err: { code: 'invalid_data',
    message: error.details[0].message,
    } });
  }
  const productUpdate = await productModel.update(id, name, quantity);
    return res.status(200).json(productUpdate);
};

module.exports = { add, getById, getAll, exclude, update };
