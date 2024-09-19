const products = require('../data/airbnb.json');
const slugify = require('slugify');
const validator = require('validator');

const productAPIModel = { 
  getAllProducts: (req, res) => {
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  },
};



console.log(`🟢 \t tourModel.js 🡒\ttourSchema `); 

module.exports = productAPIModel;
