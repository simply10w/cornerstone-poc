import React, { useState, useCallback, useReducer } from "react";
import { Layout } from "./components/Layout";
import { Form } from "./components/Form";
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
import Button from "@material-ui/core/Button";

function getSOPInstanceUIDFromUrl(study, serie, url) {
  const base = "wadors:https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs";
  const prefix = new RegExp(
    `${base}/studies/${study}/series/${serie}/instances/`
  );
  const suffix = /\/frames\/.*/g;
  url = url.replace(prefix, "");
  url = url.replace(suffix, "");
  return url;
}

function getFullState(StudyInstanceUID) {
  const elements = window.cornerstone.getEnabledElements();
  const state = window.store.getState();

  const viewports = state.viewports;
  const activePanel = viewports.activeViewportIndex;
  const panels = viewports.viewportSpecificData;

  const measurements = state.timepointManager.measurements;
  const measurementsArray = Object.values(measurements).flatMap((m) => m);

  const panelsData = elements.map((element, index) => {
    const stack = element.toolStateManager.toolState.stack.data[0];
    const currentStackImage = stack.currentImageIdIndex;
    const imageUrl = stack.imageIds[currentStackImage];
    const panel = panels[index];
    const SeriesInstanceUID = panel.SeriesInstanceUID;
    const SOPInstanceUID = getSOPInstanceUIDFromUrl(
      StudyInstanceUID,
      SeriesInstanceUID,
      imageUrl
    );

    const TotalImages = stack.imageIds.length;
    const Modality = panel.Modality;

    const imageMeasurements = measurementsArray
      .filter((m) => m.SOPInstanceUID === SOPInstanceUID)
      .map((m) => ({
        toolType: m.toolType,
        length: m.length,
        unit: m.unit,
        location: m.location,
        label: m.label || m.text,
        description: m.description,
        handles: m.handles,
      }));

    const WW = element.viewport.voi.windowWidth;
    const WC = element.viewport.voi.windowCenter;
    const Scale = element.viewport.scale;
    const HFlip = element.viewport.hflip;
    const VFlip = element.viewport.vflip;
    const Invert = element.viewport.invert;
    const Translation = element.viewport.translation;

    return {
      SOPInstanceUID,
      SeriesInstanceUID,
      Modality,
      View: {
        WW,
        WC,
        Scale,
        HFlip,
        VFlip,
        Invert,
        Translation,
      },
      CurrentStackImage: currentStackImage,
      TotalImages,
      Measurements: imageMeasurements,
    };
  });

  return {
    StudyInstanceUID,
    activePanel,
    panels: panelsData,
  };
}

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

const ViewerPage = ({ match }) => {
  const [measurements, setMeasurements] = useState(null);
  const [viewport, setViewport] = useState(null);
  const StudyInstanceUID = useParams().id;

  const base = {
    StudyInstanceUID,
  };

  const populate = useCallback(() => {
    const state = window.store.getState();
    setMeasurements(state.timepointManager.measurements);
    setViewport(getViewportData());

    console.log(getFullState(StudyInstanceUID));
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
          <Form base={base} measurements={measurements} viewport={viewport} />
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
