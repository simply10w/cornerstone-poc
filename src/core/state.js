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

export function getFullState(window, StudyInstanceUID) {
  const elements = window.cornerstone.getEnabledElements();
  const state = window.store.getState();

  const viewports = state.viewports;
  const activePanel = viewports.activeViewportIndex;
  const panels = viewports.viewportSpecificData;

  const measurements = state.timepointManager.measurements;
  const measurementsArray = Object.values(measurements).flatMap((m) => m);

  const baseline = state.timepointManager.timepoints.find(
    (t) => t.timepointType === "baseline"
  );
  const PatientID = baseline?.PatientID;

  const panelsData = elements.map((element, index) => {
    const stack = element.toolStateManager.toolState.stack.data[0];
    const TotalImages = stack.imageIds.length;
    const currentStackImage = stack.currentImageIdIndex;
    const imageUrl = stack.imageIds[currentStackImage];
    const panel = panels[index];

    const SeriesInstanceUID = panel.SeriesInstanceUID;

    const SOPInstanceUID = getSOPInstanceUIDFromUrl(
      StudyInstanceUID,
      SeriesInstanceUID,
      imageUrl
    );

    const Modality = panel.Modality;

    const View = getViewportData(element);

    const imageMeasurements = measurementsArray
      .filter((m) => m.SOPInstanceUID === SOPInstanceUID)
      .map(measurementFactory);

    return {
      TotalImages,
      CurrentStackImage: currentStackImage,
      SeriesInstanceUID,
      SOPInstanceUID,
      Modality,
      View,
      Measurements: imageMeasurements,
    };
  });

  return {
    StudyInstanceUID,
    PatientID,
    activePanel,
    panels: panelsData,
  };
}

function getViewportData(element) {
  const WW = element.viewport?.voi?.windowWidth;
  const WC = element.viewport?.voi?.windowCenter;
  const Scale = element.viewport?.scale;
  const HFlip = element.viewport?.hflip;
  const VFlip = element.viewport?.vflip;
  const Invert = element.viewport?.invert;
  const Translation = element.viewport?.translation || {};
  return {
    WW,
    WC,
    Scale,
    HFlip,
    VFlip,
    Invert,
    Translation,
  };
}

function measurementFactory(m) {
  const base = {
    toolType: m.toolType,
    handles: m.handles,
    location: m.location,
    label: m.label || m.text,
    description: m.description,
    measurementNumber: m.measurementNumber,
  };

  const extra = {};

  switch (m.toolType) {
    case "Length":
      extra.unit = m.unit;
      extra.length = m.length;
      break;
    case "Angle":
      extra.angle = m.rAngle;
      break;
    case "EllipticalRoi":
    case "RectangleRoi":
      extra.area = m.cachedStats.area;
      extra.mean = m.cachedStats.mean;
      extra.stdDev = m.cachedStats.stdDev;
      break;
    case "Bidirectional":
      extra.label = m.labels[0];
      extra.longestDiameter = m.longestDiameter;
      extra.shortestDiameter = m.shortestDiameter;
  }

  return { ...base, ...extra };
}
