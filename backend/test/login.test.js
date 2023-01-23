/* eslint-disable import/extensions */
import jest from 'jest';
// import ClientCtrl from '../controllers/client.js';
import ClientCtrl from '../controllers/client.js';

test('User inputs', () => {
  const email = 'musa@gmail.com';
  expect(email).toMatch(/gmail/);
});
