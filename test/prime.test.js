'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { isPrime } = require('../prime');

test('2 and 17 are prime numbers', () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(17), true);
});

test('0, 1, negative values and composite values are not prime', () => {
  assert.equal(isPrime(0), false);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(-7), false);
  assert.equal(isPrime(18), false);
});

test('non-integers and unsafe integers are not prime', () => {
  assert.equal(isPrime(2.5), false);
  assert.equal(isPrime(Number.MAX_SAFE_INTEGER + 1), false);
});
