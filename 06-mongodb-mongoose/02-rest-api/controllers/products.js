const Category = require('../models/Category');
const Product = require('../models/Product');
const ObjectID = require('mongodb').ObjectID;

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;
  if (!subcategory) {
    ctx.body = {};
    return next();
  }

  const productsBySubcategory = await Product.find({subcategory: subcategory});

  ctx.body = {
    products: productsBySubcategory.map((product) => ({
      id: product._id,
      title: product.title,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      description: product.description,
    }),
    ),
  };
};
module.exports.productList = async function productList(ctx, next) {
  const productList = await Product.find({});
  ctx.body = {
    products: productList.map((product) => ({
      id: product._id,
      title: product.title,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      description: product.description,
    }),
    ),
  };
};

module.exports.productById = async function productById(ctx, next) {
  if (!ObjectID.isValid(ctx.params.id)) {
    ctx.status = 400;
    ctx.body = 'не валидный Id';
    return next();
  };

  const product = await Product.findById(ctx.params.id);

  if (!product) {
    ctx.status = 404;
    ctx.body = 'такого товара нет';
    return next();
  };

  ctx.body = {
    product: {
      id: product._id,
      title: product.title,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      description: product.description,
    },
  };
};


