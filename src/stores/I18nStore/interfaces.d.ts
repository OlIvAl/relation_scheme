import { i18n } from 'i18next';

export interface II18nStore {
  locale: string;
  i18nInstance?: i18n;
  t: (key: string) => string;
  changeLanguage: (newLang: string) => void;
}
