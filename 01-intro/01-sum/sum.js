function sum(a, b) {
  /* ваш код */
  if (typeof a == 'number' && typeof b == 'number') {
    return a + b;
  } else {
    throw new TypeError('аргумент не число');
  }
}

try {
  console.log(sum(2, '3'));
} catch (e) {
  console.log(e);
}


module.exports = sum;
