const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

test('index.html contains h1 with Piscinas San José', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html);
  const h1 = dom.window.document.querySelector('h1');
  expect(h1).not.toBeNull();
  expect(h1.textContent.trim()).toBe('Piscinas San José');
});

