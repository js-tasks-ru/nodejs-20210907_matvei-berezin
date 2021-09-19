const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.encoding = options.encoding;
    this.str = '';
    this.arrLines = [];
  }

  _transform(chunk, encoding, callback) {
    this.str += chunk.toString(this.encoding);
    this.arrLines = this.str.split(`${os.EOL}`);
    this.str = this.arrLines.pop();
    this.arrLines.forEach((line) => {
      if (line) {
        this.push(line);
      }
    });
    callback(null);
  }

  _flush(callback) {
    if (this.str) {
      this.push(this.str);
    }
    callback(null);
  }
}

module.exports = LineSplitStream;
