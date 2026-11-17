'use strict';

function isPrime(number) {
  if (!Number.isSafeInteger(number) || number < 2) {
    return false;
  }

  for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
    if (number % divisor === 0) {
      return false;
    }
  }

  return true;
}

if (require.main === module) {
  const input = process.argv[2];
  const number = Number(input);

  if (input === undefined || !Number.isSafeInteger(number)) {
    console.error('Usage: node prime.js <integer>');
    process.exitCode = 1;
  } else {
    console.log(`${number} ${isPrime(number) ? 'is' : 'is not'} a prime number`);
  }
}

module.exports = { isPrime };
