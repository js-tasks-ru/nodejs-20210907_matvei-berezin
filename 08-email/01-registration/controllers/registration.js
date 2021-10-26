const {v4: uuid} = require('uuid');
const User = require('../models/User');
const sendMail = require('../libs/sendMail');
const {use} = require('koa-passport');

module.exports.register = async (ctx, next) => {
  const verificationToken = uuid();

  const user = new User({
    email: ctx.request.body.email,
    displayName: ctx.request.body.displayName,
    verificationToken,
  });

  await user.setPassword(ctx.request.body.password);
  await user.save();

  await sendMail({
    to: ctx.request.body.email,
    to: user.email,
    subject: 'Подтвердите почту',
    locals: {token: verificationToken},
    template: 'confirmation',
  });

  ctx.body = {status: 'ok'};
};

module.exports.confirm = async (ctx, next) => {
  const user = await User.findOne({verificationToken: ctx.params.token});

  if (!user) ctx.throw(400, 'Ссылка подтверждения недействительна или устарела');

  user.verificationToken = undefined;
  await user.save();

  const token = await ctx.login(user);
  // const token = uuid();

  ctx.body = {token};
};
