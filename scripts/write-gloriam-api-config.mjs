#!/usr/bin/env node
/**
 * Writes public/js/gloriam-api-config.js (and optionally out/js/) from
 * NEXT_PUBLIC_GLORIAM_API_URL — used by admin dashboard + static pages.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const baseUrl = (process.env.NEXT_PUBLIC_GLORIAM_API_URL || '').trim();

const content = `/**
 * URL Google Apps Script (voir public/admin/SETUP-GOOGLE.md)
 * Généré au build depuis NEXT_PUBLIC_GLORIAM_API_URL — ne pas éditer en prod.
 */
window.GLORIAM_API = {
  baseUrl: ${JSON.stringify(baseUrl)},
};
`;

const targets = [path.join(root, 'public', 'js', 'gloriam-api-config.js')];
if (process.argv.includes('--out')) {
  targets.push(path.join(root, 'out', 'js', 'gloriam-api-config.js'));
}

for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
  console.log(`[gloriam-api-config] ${path.relative(root, target)} → ${baseUrl ? 'URL définie' : 'baseUrl vide'}`);
}
