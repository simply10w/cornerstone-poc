import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFullState } from "../core/state";

const Events = {
  MouseUp: "cornerstonetoolsmouseup",
  DragEnd: "cornerstonetoolstouchdragend",
};

function connectCornerstoneWithStore(viewerWindow) {
  const listener = () => viewerWindow.store.dispatch({ type: "PING " });
  viewerWindow.cornerstone.getEnabledElements().forEach((e) => {
    e.element.addEventListener(Events.MouseUp, listener);
    e.element.addEventListener(Events.DragEnd, listener);
  });
  return () => {
    viewerWindow.cornerstone.getEnabledElements().forEach((e) => {
      e.element.removeEventListener(Events.MouseUp, listener);
      e.element.removeEventListener(Events.DragEnd, listener);
    });
  };
}

export const useCornerstone = (viewerWindow) => {
  const routeParams = useParams();
  const StudyInstanceUID = routeParams.id;
  const [state, setState] = useState(null);

  useEffect(() => {
    const onStoreEvent = debounce(() => {
      try {
        const fullState = getFullState(viewerWindow, StudyInstanceUID);
        setState(fullState);
      } catch (err) {}
    }, 100);
    const disconnect = connectCornerstoneWithStore(viewerWindow);
    const cleanup = viewerWindow.store.subscribe(onStoreEvent);

    return () => {
      disconnect();
      cleanup();
    };
  }, [StudyInstanceUID, viewerWindow]);

  useEffect(() => {
    console.log(state);
  }, [state]);
  return state;
};
