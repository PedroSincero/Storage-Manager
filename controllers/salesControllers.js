const salesModel = require('../models/salesModel');
const { validQuantity, isIDExists } = require('../services/salesValid');

const add = async (req, res) => {
  const sales = req.body;

  const { productId } = sales[0];
  const { quantity } = sales[0];

  const isValidProductID = await isIDExists(productId);
  const isValidQuantity = validQuantity(quantity);

  if (!isValidProductID) {
    return res.status(422).json({ err: { code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
     } }); 
  }

  if (isValidQuantity) {
 return res.status(422).json({ err: { code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
   } }); 
}

  const newSales = await salesModel.add(sales);

  return res.status(200).json(newSales);
};

const getAll = async (req, res) => {
  const salesAll = await salesModel.getAll();
  return res.status(200).json({ sales: salesAll });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const isExist = await isIDExists(id);

  if (!isExist) {
    return res.status(422).json({ err: { code: 'invalid_data',
    message: 'Sale not found',
     } });
  }

  const salesID = await salesModel.getById(id);
  return res.status(200).json(salesID);
};

module.exports = { 
  add,
   getById,
    getAll, 
  // exclude, update 
};

// Agradecimentos a leandro reis Turma 10 - tribo B -- Pelo auxilio no req 5 