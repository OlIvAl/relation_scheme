import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';

import * as mobx from 'mobx';
import {IFamilyTreeStore} from './stores/FamilyTreeStore/interfaces';
import FamilyTreeStore from './stores/FamilyTreeStore';
import RootStore from './stores/RootStore';
import {IRootStore} from './interfaces';
import i18nInstance from './configs/i18nextConfig';

// import * as serviceWorker from './serviceWorker';

mobx.configure({ enforceActions: 'observed' });

const rootStore: IRootStore = new RootStore(i18nInstance);

if (process.env.NODE_ENV !== 'production') {
  (window as any).__STORES__ = rootStore; // For Debug
}

ReactDOM.render(
  <Provider
    familyTreeStore={rootStore.familyTreeStore}
    i18nStore={rootStore.i18nStore}
  >
    <App />
  </Provider>,
  document.getElementById('family-tree-root'),
  () => rootStore.familyTreeStore.init(window.FT_ID, window.FT_TYPE)
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
