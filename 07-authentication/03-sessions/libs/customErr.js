module.exports.ErrExistToken = class ErrExistToken extends Error {
   constructor(message) {
      super(message);
      this.name = 'ErrExistToken';
      this.status = 401;
   }
};

module.exports.ErrUserIsNotLogged = class ErrUserIsNotLogged extends Error {
   constructor(message) {
      super(message);
      this.name = 'ErrUserIsNotLogged';
      this.status = 401;
   }
};