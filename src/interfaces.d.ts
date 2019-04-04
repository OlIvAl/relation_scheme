import I18nStore from './stores/I18nStore';
import {IFamilyTreeStore} from './stores/FamilyTreeStore/interfaces';

export interface IRootStore {
  i18nStore: I18nStore;
  familyTreeStore: IFamilyTreeStore;
}