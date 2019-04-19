import {IRootStore} from './interfaces';

declare global {
  declare module 'react-selector-hooks';

  interface ITheme {
    roles: {
      [key: string]: string
    }
    types: {
      [key: string]: string
    }
  }

  interface Window {
    __STORES__: IRootStore;
    FT_LNG: string;
    FT_JSON_URL: string;
    FT_TYPE: number;
    FT_ID: number;
    theme: ITheme;
  }

  interface Element {
    mozRequestFullScreen: () => Promise<void>;
    webkitRequestFullscreen: () => Promise<void>;
    msRequestFullscreen: () => Promise<void>;
  }

  interface Document {
    mozFullScreenEnabled: boolean;
    webkitRequestFullScreen: boolean;

    webkitFullscreenElement: Element;
    mozFullScreenElement: Element;
    msFullscreenElement: Element;

    webkitExitFullscreen: () => Promise<void>;
    mozCancelFullScreen: () => Promise<void>;
    msExitFullscreen: () => Promise<void>;
  }

  interface ProcessEnv {
    [key: string]: string | undefined;
  }
}
