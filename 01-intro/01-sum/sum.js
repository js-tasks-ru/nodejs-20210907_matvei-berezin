function sum(a, b) {
  /* ваш код */
  if (typeof a == 'number' && typeof b == 'number') {
    return a + b;
  } else {
    return new TypeError('аргумент не число');
  }
}
console.log(sum(2, '3'));

module.exports = sum;
