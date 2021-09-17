const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.encoding = options.encoding;
    this.size = 0;
  }

  _transform(chunk, encoding, callback) {
    this.size += chunk.byteLength;

    if (this.size <= this.limit) {
      callback(null, chunk.toString(this.encoding));
    } else {
      callback(new LimitExceededError);
    }
  }
}


module.exports = LimitSizeStream;
