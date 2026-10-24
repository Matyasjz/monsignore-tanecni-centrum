// Kontrola obsahu šablony: npm run check
// Vykreslí všechny stránky z src/pages.js (Vite SSR) a ověří odkazy, fotky a pravidla z briefu.
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createServer } from 'vite';

const root = resolve(import.meta.dirname, '..');

// Stránky z předchozí verze, které se teprve přepíšou (PLAN.md): chyby v nich jsou jen varování
const legacy = new Set();

// Brief, sekce 7: neplatné věci a překlepy, které mají být opravené
const forbidden = [
  [/Tanec PLUS/i, 'Tanec PLUS (zrušeno)'],
  [/Tiny Tutus/i, 'Tiny Tutus (zrušeno)'],
  [/Magdalena /, '„Magdalena“ bez čárky (má být Magdaléna)'],
  [/Našim cílem/, '„Našim cílem“ (má být Naším)'],
  [/seběvědomí/, '„seběvědomí“ (má být sebevědomí)'],
];

const server = await createServer({ root, logLevel: 'error', server: { middlewareMode: true }, appType: 'custom' });
const errors = [];
const warnings = [];

try {
  const { getPage, slugs } = await server.ssrLoadModule('/src/pages.js');
  const shell = readFileSync(resolve(root, 'index.html'), 'utf8');

  const report = (slug, message) => (legacy.has(slug) ? warnings : errors).push(`#/${slug}: ${message}`);

  for (const slug of slugs()) {
    const page = getPage(slug);
    if (!page.title) report(slug, 'chybí title');

    for (const [pattern, label] of forbidden) {
      if (pattern.test(page.html)) report(slug, label);
    }

    for (const [, src] of page.html.matchAll(/(?:src|srcset)="(img\/[^"\s]+)/g)) {
      if (!existsSync(resolve(root, 'public', src))) report(slug, `chybí fotka public/${src}`);
    }

    const todo = page.html.match(/\[DOPLNIT[^\]]*\]/g);
    if (todo) warnings.push(`#/${slug}: ${todo.length}× [DOPLNIT] (${[...new Set(todo)].join(', ')})`);
  }

  // Interní odkazy ze všech stránek i z hlavičky a patičky musí vést na existující stránku
  const html = [shell, ...slugs().map((slug) => getPage(slug).html)].join('\n');
  for (const [, target] of new Set([...html.matchAll(/href="#\/([^"]*)"/g)].map((m) => [m[0], m[1]]))) {
    if (!getPage(target.replace(/\/$/, ''))) errors.push(`odkaz #/${target} nevede na žádnou stránku`);
  }

  // Minulé akce se musí skrýt: den po skončení poslední akce nesmí zůstat žádná
  const { upcoming } = await server.ssrLoadModule('/src/blocks/events.js');
  const { calendar } = (await server.ssrLoadModule('/src/data/akce.json')).default;
  const lastEnd = calendar.events.map(({ end }) => end).sort().at(-1);
  if (lastEnd) {
    const dayAfter = new Date(`${lastEnd}T12:00:00Z`);
    dayAfter.setUTCDate(dayAfter.getUTCDate() + 1);
    if (upcoming(calendar.events, dayAfter).length) errors.push('akce: minulé akce se neskrývají');
    if (!upcoming(calendar.events, new Date(`${lastEnd}T12:00:00Z`)).length) errors.push('akce: akce zmizela už v den konání');
  }

  console.log(`Zkontrolováno ${slugs().length} stránek.`);
} catch (error) {
  errors.push(error.stack ?? String(error));
} finally {
  await server.close();
}

warnings.forEach((line) => console.warn(`varování  ${line}`));
errors.forEach((line) => console.error(`CHYBA     ${line}`));
if (errors.length) process.exit(1);
console.log(errors.length || warnings.length ? `OK s ${warnings.length} varováními.` : 'OK.');
