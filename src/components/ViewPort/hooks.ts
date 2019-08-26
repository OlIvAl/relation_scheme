import * as React from 'react';
import throttle from 'lodash.throttle';

/* View in fullscreen */
function openFullscreen(elem: Element): void {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen(): void {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

function fullscreenElementExist(): boolean {
  return !!(document.fullscreenElement
    || document.webkitFullscreenElement
    || document.mozFullScreenElement
    || document.msFullscreenElement);
}

const polyfillFullscreenEnabled: boolean = document.fullscreenEnabled
  || document.mozFullScreenEnabled
  || document.webkitRequestFullScreen;

export default
function useViewPortFullscreen(
  ref: React.RefObject<HTMLDivElement>,
  setViewPortOffset: (top: number, left: number) => void,
  fullScreenChangeHandler: (viewPort: HTMLDivElement) => void
): [boolean, () => void] {
  React.useEffect((): void => {
    const viewPort: HTMLDivElement | null = ref.current;

    if(viewPort) {
      const {
        left,
        top
      }: ClientRect = viewPort.getBoundingClientRect();

      setViewPortOffset(top, left);
    }
  }, [ref, setViewPortOffset]);

  React.useEffect((): () => void => {
    const viewPort: HTMLDivElement | null = ref.current;

    function fullscreenChangeHandler({target}: Event): void {
      if(target) {
        fullScreenChangeHandler(target as HTMLDivElement);
      }
    }

    function resizeHandler(): void {
      if(viewPort && polyfillFullscreenEnabled) {
        if(fullscreenElementExist()) {
          fullScreenChangeHandler(viewPort);
        }
      }
    }

    const throttleResizeHandler: () => void = throttle(resizeHandler, 300);

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    window.addEventListener('resize', throttleResizeHandler);

    return (): void => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
      window.removeEventListener('resize', throttleResizeHandler);
    };
  }, [fullScreenChangeHandler, ref]);

  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);

  function switchViewPortFullScreen(): void {
    const viewPort: HTMLDivElement | null = ref.current;

    if(viewPort && polyfillFullscreenEnabled) {
      if(fullscreenElementExist()) {
        closeFullscreen();

        setIsFullscreen(false);
      } else {
        openFullscreen(viewPort);

        setIsFullscreen(true);
      }
    }
  }

  return [isFullscreen, switchViewPortFullScreen];
}