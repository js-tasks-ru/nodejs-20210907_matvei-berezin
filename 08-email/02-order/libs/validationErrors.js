module.exports = async function handleMongooseValidationError(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.name !== 'ValidationError') throw err;

    ctx.status = 400;

    const errors = {};

    for (const field of Object.keys(err.errors)) {

      if (field === 'email') {
        errors[field] = 'Такой email уже существует';
        continue;
      };
      errors[field] = err.errors[field].message;
    }

    ctx.body = {
      errors: errors,
    };
  }
};
