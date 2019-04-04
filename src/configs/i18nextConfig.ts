import i18next from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

export enum Locale {
  RU = 'ru',
  LV = 'lv',
  EN = 'en',
}

i18next
  // .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV !== 'production',
    lng: window.FT_LNG,
    resources: {
      [Locale.RU]: {
        bubble: {
          legalForm: 'Правовая форма',
          address: 'Адрес',
          regDate: 'Дата регистрации',
          shareCapital: 'Уставный капитал',
          fullyPaid: 'полностью оплачен',
          from: 'с',
          until: 'до'
        }
      },
      [Locale.EN]: {
        bubble: {
          legalForm: 'Legal form',
          address: 'Address',
          regDate: 'Registration date',
          shareCapital: 'Share capital',
          fullyPaid: 'fully paid',
          from: 'from',
          until: 'until'
        }
      },
      [Locale.LV]: {
        bubble: {
          legalForm: 'Tiesiskā forma',
          address: 'Adrese',
          regDate: 'Reģistrācijas datums',
          shareCapital: 'Pamatkapitāls',
          fullyPaid: 'pilnībā apmaksāts',
          from: 'no',
          until: 'līdz'
        }
      },
    },
  });

export default i18next;
