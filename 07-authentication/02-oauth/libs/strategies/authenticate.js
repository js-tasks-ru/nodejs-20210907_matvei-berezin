const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
  console.log(`in authenticate(${strategy}, ${email}, ${displayName}, done)`);
  if (!email) {
    done(null, false, 'Не указан email');
    return;
  };

  async function findUser(email) {
    const user = await User.findOne({email: email});
    return user;
  };

  async function createUser(email, displayName) {
    await User.create({email: email, displayName: displayName});
  };

  try {
    let user = await findUser(email);

    if (!user) {
      await createUser(email, displayName);
      user = await findUser(email);
    };

    done(null, user);
  } catch (error) {
    // if (error.errors.email.message === 'Некорректный email.') {
    //   done(null, false, error.errors.email.message);
    // };
    done(error);
  };
  // done(null, false, `функция аутентификации с помощью ${strategy} не настроена`);
};
