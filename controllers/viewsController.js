const Product = require(`./../models/productModel`);
const catchAsync = require(`./../utils/catchAsync`);
const axios = require("axios");

// exports.getOverview = catchAsync(async (req, res) => {
//   const products = await Product.find();
//   res.render("overview", {
//     products,
//   });
// });

exports.getOverview = catchAsync(async (req, res) => {
  const products = await Product.find();

  const filteredProducts = await Promise.all(
    products.map(async (product) => {
      const imageUrl = product.images.picture_url; // Access the picture_url property correctly

      if (typeof imageUrl !== "string") {
        console.log(`Product ${product.id} does not have a valid image URL.`);
        return null; // Handle case where picture_url is not a string
      }

      try {
        const response = await axios.head(imageUrl); // Make HEAD request
        if (response.status === 200) {
          return product; // Return the product if the image status is 200
        }
      } catch (error) {
        console.log(
          `Error checking image for product ${product.id}: ${error.message}`
        );
      }
      return null; // Return null for products with image issues
    })
  );

  // Filter out null values
  const validProducts = filteredProducts.filter((product) => product !== null);

  res.render("overview", {
    products: validProducts,
  });
});

// exports.getOverview = catchAsync(async (req, res) => {
//   const products = await Product.find({
//     name: { $ne: '' },
//     summary: { $ne: '' },
//     description: { $ne: '' },
//     neighborhood_overview: { $ne: '' },
//     notes: { $ne: '' },
//     transit: { $ne: null },
//     access: { $ne: null },
//     house_rules: { $ne: null },
//     property_type: { $ne: null },
//     room_type: { $ne: null },
//     bed_type: { $ne: null },
//     bathrooms: { $ne: null },
//     bedrooms: { $ne: null },
//     beds: { $ne: null },
//     price: { $ne: null },
//     amenities: { $ne: null },
//     images: { $ne: null },
//     host: { $ne: null },
//     host_name: { $ne: null },
//     host_image: { $ne: null },
//     host_description: { $ne: null },
//     host_is_superhost: { $ne: null },
//     host_listings_count: { $ne: null },
//     host_total_listings_count: { $ne: null },
//     host_verifications: { $ne: null },
//     host_has_profile_pic: { $ne: null },
//     host_identity_verified: { $ne: null },
//     street: { $ne: null },
//     city: { $ne: null },
//     state: { $ne: null },
//     zipcode: { $ne: null },
//     country: { $ne: null },
//     latitude: { $ne: null },
//     longitude: { $ne: null },
//     is_location_exact: { $ne: null },
//     property_type: { $ne: null },
//     room_type: { $ne: null },
//     bed_type: { $ne: null },
//     security_deposit: { $ne: null },
//     cleaning_fee: { $ne: null },

//     // conditionals
//     bathrooms: { $gte: 2, $lte: 5 },
//     security_deposit: { $gte: 1, $lte: 200 },
//     cleaning_fee: { $gte: 0, $lte: 200 },
//   });
//   res.render('overview', {
//     title: 'All Products',
//     products,
//   });
// });

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.slug });
  res.status(200).render("product", {
    title: "Product",
    product,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getSignUpForm = (req, res) => {
  res.status(200).render("signup", {
    title: "Log into your account",
  });
};

exports.getBillingPage = (req, res) => {
  res.status(200).render("billing", {
    title: "Billing",
  });
};

exports.getPrivacy = catchAsync(async (req, res, next) => {
  res.status(200).render("privacy", {
    title: "Privacy",
  });
});
