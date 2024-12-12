import LocalizedStrings from 'react-localization';

const locales = new LocalizedStrings({
  ru: [
    { income: "Карьер", resource: "Кирпичи" },
    { income: "Магия", resource: "Самоцветы" },
    { income: "Подзем.", resource: "Существа" },
  ],
  en: [
    { income: "Quarry", resource: "Bricks" },
    { income: "Magic", resource: "Gems" },
    { income: "Dungeon", resource: "Recruits" },
  ],
});

export default locales;