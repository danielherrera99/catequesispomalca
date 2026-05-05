import fs from 'fs';
import { parse } from '@babel/parser';

try {
  const code = fs.readFileSync('src/App.jsx', 'utf8');
  parse(code, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
  console.log('JSX parsing successful!');
} catch (e) {
  console.error('JSX parsing failed:');
  console.error(e.message);
  process.exit(1);
}
