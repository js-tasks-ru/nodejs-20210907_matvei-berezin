module.exports = async function handleMongooseValidationError(ctx, next) {
  try {
    await next();
  } catch (err) {
    const errors = {};

    if (err.name !== 'ValidationError') {
      if (err.code === '11000') {
        console.log(`модуль ValidationError, обход прекрасного плагина`);
        ctx.status = 400;
        ctx.body = {errors: {email: 'Такой email уже существует'}};
        // ctx.throw(400, 'Такой email уже существует');
      };
      throw err;
    };

    ctx.status = 400;

    for (const field of Object.keys(err.errors)) {
      if (field === 'email') {
        errors[field] = 'Такой email уже существует';
        continue;
      };
      errors[field] = err.errors[field].message;
    }

    console.log('errors - ', errors);
    ctx.body = {
      errors: errors,
    };
  }
};

