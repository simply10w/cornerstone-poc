import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useIsViewerOnlyWindow() {
  const location = useLocation();
  return location.search.includes("onlyViewer=1");
}

export const useFullPageViewer = () => {
  const [viewerWindow, setViewerWindow] = useState(null);
  const isViewerOnlyWindow = useIsViewerOnlyWindow();

  const tryToSetViewer = (child) => {
    if (child.store && child.cornerstone) {
      setViewerWindow(child);
    } else {
      setTimeout(() => tryToSetViewer(child), 200);
    }
  };

  const openInFullWindow = useCallback(() => {
    if (!viewerWindow) {
      const child = window.open(window.location + "?onlyViewer=1");
      tryToSetViewer(child);
    }
  }, [viewerWindow]);

  const onViewerWindowClose = () => {
    setViewerWindow(null);
  };

  useEffect(() => {
    if (viewerWindow) {
      viewerWindow.onunload = onViewerWindowClose;
    }
  }, [viewerWindow]);

  return {
    isViewerOnlyWindow,
    isViewerOpenedInAnotherWindow: !!viewerWindow,
    openInFullWindow,
    viewerWindow: viewerWindow || window,
  };
};
