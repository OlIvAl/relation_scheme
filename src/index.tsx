import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import {configure} from 'mobx';
import RootStore from './stores/RootStore';
import {IRootStore} from './interfaces';
import i18nInstance from './configs/i18nextConfig';

configure({ enforceActions: 'observed' });

const rootStore: IRootStore = new RootStore(i18nInstance);

if ((process).env.NODE_ENV !== 'production') {
  window.__STORES__ = rootStore; // For Debug
}

export const StoreContext: React.Context<IRootStore> = React.createContext(rootStore);

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider
      value={rootStore}
    >
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('family-tree-root'),
  rootStore.familyTreeStore.init.bind(null, window.FT_ID, window.FT_TYPE)
);
