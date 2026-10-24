import site from '../data/site.json';
import { picture } from './media.js';

const compact = (date) => date.replaceAll('-', '');
const nextDay = (date) => {
  const day = new Date(`${date}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() + 1);
  return day.toISOString().slice(0, 10);
};
const plain = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const icsText = (text) => plain(text).replace(/[\\,;]/g, (char) => `\\${char}`);

// Celodenní událost (čas zatím chybí); DTEND je u celodenních událostí exkluzivní, proto den po konci
const icsHref = ({ id, title, start, end, place }) => {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Taneční centrum Monsignore//Akce//CS', 'BEGIN:VEVENT',
    `UID:${id}@monsignore.cz`,
    `DTSTAMP:${compact(start)}T000000Z`,
    `DTSTART;VALUE=DATE:${compact(start)}`,
    `DTEND;VALUE=DATE:${compact(nextDay(end))}`,
    `SUMMARY:${icsText(title)}`,
    `LOCATION:${icsText(place)}`,
    'END:VEVENT', 'END:VCALENDAR',
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`;
};

const googleHref = ({ title, start, end, place }) => `https://calendar.google.com/calendar/render?${new URLSearchParams({
  action: 'TEMPLATE',
  text: plain(title),
  dates: `${compact(start)}/${compact(nextDay(end))}`,
  location: place,
}).toString()}`;

// Akce, které už skončily, se nezobrazí (porovnává se s dnešním datem při načtení stránky)
export const upcoming = (events, today = new Date()) => {
  const todayIso = today.toLocaleDateString('sv-SE'); // místní datum ve tvaru RRRR-MM-DD
  return events.filter(({ end }) => end >= todayIso);
};

export const eventsCalendar = ({ title, empty, events }) => {
  const list = upcoming(events);
  return `
  <section class="section section--surface" id="kalendar">
    <div class="site-container">
      <h2 class="section-title__heading section-title--center mb-12 md:mb-16">${title}</h2>
      ${list.length ? list.map((event) => `
        <article class="event-card reveal">
          <div class="event-card__poster">
            ${event.poster ? picture(event.poster, { sizes: '(min-width: 768px) 30vw, 100vw' }) : `<span class="todo">${event.posterTodo}</span>`}
          </div>
          <div class="event-card__body">
            <p class="event-card__date">${event.dateLabel}</p>
            <h3 class="event-card__title">${event.title}</h3>
            <dl class="info-list event-card__meta">
              <div><dt>Kdy?</dt><dd>${event.dateLabel}, ${event.time}</dd></div>
              <div><dt>Kde?</dt><dd>${event.place}</dd></div>
              <div><dt>Cena</dt><dd>${event.price}</dd></div>
              <div><dt>${event.lecturerLabel}</dt><dd>${event.lecturer}</dd></div>
            </dl>
            <div class="event-card__actions">
              <a class="btn btn--solid" href="mailto:${site.email}?subject=${encodeURIComponent(`Přihláška: ${plain(event.title)}`)}">Přihlásit se</a>
              <a class="link-line" href="${icsHref(event)}" download="${event.id}.ics">Přidat do kalendáře</a>
              <a class="link-line" href="${googleHref(event)}" target="_blank" rel="noopener">Google Kalendář</a>
            </div>
          </div>
        </article>`).join('') : `<p class="text-center">${empty}</p>`}
    </div>
  </section>`;
};
