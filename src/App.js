import React, { useState, useCallback, useReducer, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Report } from "./components/Report/Report";
import { Viewer } from "./components/Viewer";
import { StudiesList } from "./components/StudiesList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { ThemeProvider } from "./core/ThemeProvider";
import { getFullState } from "./core/state";
import { debounce } from "lodash";

function cornerstoneChanged() {
  window.store.dispatch({ type: "PING " });
}

const Events = {
  MouseUp: "cornerstonetoolsmouseup",
  DragEnd: "cornerstonetoolstouchdragend",
};

function subscribeToCornerstone() {
  unsubscribeFromCornerstone();
  window.cornerstone.getEnabledElements().forEach((e) => {
    e.element.addEventListener(Events.MouseUp, cornerstoneChanged);
    e.element.addEventListener(Events.DragEnd, cornerstoneChanged);
  });
}
function unsubscribeFromCornerstone() {
  window.cornerstone.getEnabledElements().forEach((e) => {
    e.element.removeEventListener(Events.MouseUp, cornerstoneChanged);
    e.element.removeEventListener(Events.DragEnd, cornerstoneChanged);
  });
}

const ViewerPage = ({ match }) => {
  const [state, setState] = useState(null);
  const StudyInstanceUID = useParams().id;

  const populate = useCallback(() => {
    try {
      const _state = getFullState(StudyInstanceUID);
      console.log(_state);
      setState(_state);
    } catch (err) {
      console.log(err);
      console.log("There was an error, ignore");
    }
  }, [StudyInstanceUID]);

  const onStoreEvent = debounce(() => {
    subscribeToCornerstone();
    populate();
  }, 100);

  useEffect(() => {
    const cleanup = window.store.subscribe(onStoreEvent);
    return () => {
      cleanup();
      unsubscribeFromCornerstone();
    };
  }, [populate]);

  const leftPanel = () => {
    return state && <Report report={state} />;
  };
  const rightPanel = () => <Viewer />;
  return <Layout renderLeftPanel={leftPanel} renderRightPanel={rightPanel} />;
};

const Routes = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Studies</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/viewer/:id">
          <ViewerPage />
        </Route>
        <Route path="/">
          <StudiesList />
        </Route>
      </Switch>
    </div>
  </Router>
);

export function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}
