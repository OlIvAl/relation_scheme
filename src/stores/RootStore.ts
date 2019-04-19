import {IRootStore} from '../interfaces';
import I18nStore from './I18nStore';
import {IFamilyTreeStore} from './FamilyTreeStore/interfaces';
import FamilyTreeStore from './FamilyTreeStore';
import i18next from '../configs/i18nextConfig';

export default class RootStore implements IRootStore {
  i18nStore: I18nStore;
  familyTreeStore: IFamilyTreeStore;

  constructor(i18nInstance: i18next.i18n) {
    this.familyTreeStore = new FamilyTreeStore(this);
    this.i18nStore = new I18nStore(this, i18nInstance);
  }
}