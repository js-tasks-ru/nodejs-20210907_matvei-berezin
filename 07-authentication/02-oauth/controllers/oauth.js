const passport = require('../libs/passport');
const config = require('../config');
const {v4: uuid} = require('uuid');

module.exports.oauth = async function oauth(ctx, next) {
  const provider = ctx.params.provider;
  // console.log('provider in fn oauth : ', provider);
  // console.log('config.providers[provider].options : ', config.providers[provider].options);

  await passport.authenticate(
    provider,
    config.providers[provider].options,
  )(ctx, next);

  ctx.status = 200;
  ctx.body = {status: 'ok', location: ctx.response.get('location')};
  // console.log('ctx.response.get(location) : ', ctx.response.get('location'));

  ctx.response.remove('location');
};

module.exports.oauthCallback = async function oauthCallback(ctx, next) {
  const provider = ctx.request.body.provider;

  await passport.authenticate(provider, async (err, user, info) => {
    if (err) {
      if (err && err.errors && err.errors.email && err.errors.email.message === 'Некорректный email.') {
        ctx.status = 400;
        const massage = err.errors.email.message;
        ctx.body = {error: massage};
        console.log(err.errors.email.message);
        return;
      }
      throw err;
    }

    if (!user) {
      ctx.status = 400;
      ctx.body = {error: info};
      return;
    };

    const token = uuid();

    ctx.body = {token};
  })(ctx, next);
};
