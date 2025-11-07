import { test } from '@playwright/test';
import { CharGen } from '../../utils/characterGenerator.js';
import { printBox } from '../../utils/cardmod.js';

test('Character Generator', async () => {
  const user = `user.${CharGen.getRandomString(3)}`;
  const email = `${user}@test.com`;
  const pass = CharGen.getRandomString(10);

  const fields = [
    { label: '👤 User', value: user },
    { label: '📧 Email', value: email },
    { label: '🔑 Password', value: pass },
  ];

  printBox('New User Info', fields);

});