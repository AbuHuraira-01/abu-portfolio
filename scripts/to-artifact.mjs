// Turns dist-single/index.html into a page fragment for publishing as a claude.ai artifact.
import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('dist-single/index.html', 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];

const title = head.match(/<title>[\s\S]*?<\/title>/)[0];
const metas = (head.match(/<meta (name|property)="(claude:viewport-fit-sides|description|og:[a-z]+)"[^>]*>/g) || []).join('\n');
const links = (head.match(/<link[^>]*>/g) || []).join('\n');
const styles = (head.match(/<style[\s\S]*?<\/style>/g) || []).join('\n');
const allScripts = head.match(/<script[\s\S]*?<\/script>/g) || [];
const early = allScripts.filter((t) => !/type="module"/.test(t)).join('\n');
const modules = allScripts.filter((t) => /type="module"/.test(t)).join('\n');
const bodyHtml = body.replace(/<noscript>[\s\S]*?<\/noscript>/, '').trim();

writeFileSync('artifact.html', [title, metas, links, styles, early, bodyHtml, modules].join('\n'));
console.log('artifact.html written', Math.round(readFileSync('artifact.html').length / 1024), 'KB');
