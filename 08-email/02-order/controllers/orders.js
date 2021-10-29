const Order = require('../models/Order');
const Product = require('../models/Product');
const sendMail = require('../libs/sendMail');

module.exports.checkout = async function checkout(ctx, next) {
  const product = await Product.findOne({_id: ctx.request.body.product});

  const order = await Order.create({
    user: ctx.user,
    product: product,
    phone: ctx.request.body.phone,
    address: ctx.request.body.address,
  });

  await sendMail({
    to: ctx.user.email,
    subject: 'Подтверждение заказа',
    locals: {id: order._id, product: product},
    template: 'order-confirmation',
  });
  ctx.body = {order: order.id};
};

module.exports.getOrdersList = async function ordersList(ctx, next) {
  const orders = await Order.find({user: ctx.user}).populate('product');
  ctx.body = {orders: orders};
};
