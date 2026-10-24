import rozvrh from '../data/rozvrh.json';

// Rozvrh je jediný zdroj časů, cen a začátků výuky. Detaily kurzů i tabulka čtou odsud.
export const lesson = (id) => {
  const found = rozvrh.lessons.find((item) => item.id === id);
  if (!found) throw new Error(`Lekce „${id}“ není v src/data/rozvrh.json`);
  return found;
};

export const lessonWhen = ({ day, from, to }) => `${rozvrh.days[day]} ${from}–${to}`;
export const lessonPrice = ({ price, minutes }) => `${price} Kč/${minutes} minut`;
export const lessonPayment = ({ price }) => `pololetně, dle počtu lekcí v daném pololetí x ${price} Kč`;

// Tabulka rozvrhu, na mobilu se řádky skládají do karet (popisky buněk z data-label)
export const scheduleTable = (columns) => `
  <table class="schedule">
    <thead><tr>${columns.map((column) => `<th scope="col">${column}</th>`).join('')}</tr></thead>
    <tbody>
      ${rozvrh.lessons.map(({ day, from, to, course, href, minutes, price }) => `
        <tr>
          <td data-label="${columns[0]}">${day}</td>
          <td data-label="${columns[1]}">${from}–${to}</td>
          <th scope="row" data-label="${columns[2]}"><a href="${href}">${course}</a></th>
          <td data-label="${columns[3]}">${minutes} min</td>
          <td data-label="${columns[4]}">${price} Kč</td>
        </tr>`).join('')}
    </tbody>
  </table>`;
