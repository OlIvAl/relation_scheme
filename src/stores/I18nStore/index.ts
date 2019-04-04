import { observable, action, reaction } from 'mobx';
import i18next from 'i18next';
import {II18nStore} from './interfaces';
import {IRootStore} from '../../interfaces';

// import { IRootStore } from 'src/data-layer/interfaces';

export default class I18nStore implements II18nStore {
  @observable locale: string;

  @observable i18next: i18next.i18n;

  constructor(rootStore: IRootStore, i18next: i18next.i18n) {
    this.i18next = i18next;
    this.locale = i18next.language;

    reaction(
      () => this.locale,
      (curlocale: string) => {
        this.i18next.changeLanguage(curlocale);
      }
    );
  }

  @action.bound
  t(key: string): string{
    return this.i18next.t(key)
  };

  @action.bound
  changeLanguage(newLang: string): void {
    this.locale = newLang;
  }
}