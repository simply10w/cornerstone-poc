import React, { useState, useCallback, useReducer } from "react";
import { Layout } from "./components/Layout";
import { Form } from "./components/Form";
import { Viewer } from "./components/Viewer";
import { StudiesList } from "./components/StudiesList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider } from "./core/ThemeProvider";
import Button from "@material-ui/core/Button";

const getViewportData = () => {
  const elements = window.cornerstone.getEnabledElements();
  const viewport = elements[0].viewport;

  return {
    scale: viewport.scale,
    WW: viewport.voi.windowWidth,
    WC: viewport.voi.windowCenter,
    hflip: viewport.hflip,
    vflip: viewport.vflip,
    invert: viewport.invert,
    translation: viewport.translation, // for panning
  };
};

const ViewerPage = () => {
  const [measurements, setMeasurements] = useState(null);
  const [viewport, setViewport] = useState(null);

  const populate = useCallback(() => {
    const state = window.store.getState();
    setMeasurements(state.timepointManager.measurements);
    setViewport(getViewportData());
  }, []);

  const clear = useCallback(() => {
    setMeasurements(null);
    setViewport(null);
  }, []);

  const leftPanel = () => {
    return (
      <>
        <Button onClick={clear}>Clear current state</Button>
        <Button onClick={populate}>Populate current state</Button>
        {measurements && viewport && (
          <Form measurements={measurements} viewport={viewport} />
        )}
      </>
    );
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

function getCurrentState() {
  return window.store.getState();
}

// function getCurrentData() {
//   const state = window.store.getState();
//   const viewports = state.viewports;

//   const elements = cornerstone.getEnabledElements().forEach((e) => {
//     console.log(e);
//   });

//   const images = [];
//   for (let i = 0; i < viewports.layout.viewports.length; i++) {
//     const data = viewports.viewportSpecificData[i];
//     if (!data) continue;
//     const {
//       displaySetInstanceUid,
//       studyInstanceUid,
//       sopInstanceUid,
//       currentImageIdIndex,
//     } = data;
//     // const cviewport = cornerstone.getViewport(dom);

//     images.push({
//       ohif: {
//         displaySetInstanceUid,
//         studyInstanceUid,
//         sopInstanceUid,
//         currentImageIdIndex,
//       },
//     });
//   }

//   const measurements = {};
//   const timepointManager = state.timepointManager;
//   measurements.timepoints = timepointManager.timepoints;
//   measurements.measurements = timepointManager.measurements;

//   console.log({
//     images,
//     measurements,
//   });
// }
