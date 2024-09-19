const { Console } = require("console");
const fs = require(`fs`);
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/airbnb40.json`)
);

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: products.length,
    data: products,
  });
};

exports.getOneProduct = (req, res) => {

  console.log(req.params);
  
  // match name with the name in the data

  const product = products.find((el) => el.name === req.params.name);

  console.log(product);

  if(!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    message: 'Get One Tour: Passed',
    data: {
      product,
    },
  });
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// show only few random documents
exports.getRandomProducts = async (req, res) => {
  try {
    const products = await Product.find({ active: { $ne: false } });
    const randomProducts = [];
    const randomProductsLength = Math.floor(Math.random() * 6);
    for (let i = 0; i < randomProductsLength; i++) {
      randomProducts.push(
        products[Math.floor(Math.random() * products.length)]
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        products: randomProducts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
