/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');
const { expect } = require('code');
const { it } = exports.lab = require('lab').script();

const schema = require('./schema');
const joiDescribe = require('../index');

it('Generates correct output', () => {
  const result = joiDescribe(schema);
  const expected = fs.readFileSync(path.join(__dirname, 'expected/out.html'), 'utf-8');

  expect(result).to.equal(expected.trim());
});
