// http://localhost:3000/api/products?query=Product1
const Product = require('../models/Product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const {query} = ctx.query;

  const productsByQuery = await Product.find({$text: {$search: query}});

  ctx.body = {
    products: productsByQuery.map((product) => ({
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
