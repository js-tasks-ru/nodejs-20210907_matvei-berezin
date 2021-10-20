module.exports = function mustBeAuthenticated(ctx, next) {
  const {ErrUserIsNotLogged} = require('../libs/customErr');

  if (!ctx.user) throw new ErrUserIsNotLogged('Пользователь не залогинен');

  return next();
};
