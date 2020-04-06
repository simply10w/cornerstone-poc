import React, { useRef, useEffect } from "react";

const extension = {
  id: "com.ohif.bioclinica-test",
  preRegistration({ servicesManager, configuration = {} }) {
    const onUpdate =
      servicesManager.services.MeasurementService.EVENTS.MEASUREMENT_UPDATED;

    const onAdd =
      servicesManager.services.MeasurementService.EVENTS.MEASUREMENT_ADDED;

    const handleMeasurement = (measurement) => {
      console.log({
        id: measurement.id,
        SOPInstanceUID: measurement.SOPInstanceUID,
        FrameOfReferenceUID: measurement.FrameOfReferenceUID,
        referenceSeriesUID: measurement.referenceSeriesUID,
        points: measurement.points,
        unit: measurement.unit,
        label: measurement.label,
        description: measurement.description,
        area: measurement.area,
        type: measurement.type,
      });
    };

    servicesManager.services.MeasurementService.subscribe(onAdd, (data) => {
      handleMeasurement(data.measurement);
    });

    servicesManager.services.MeasurementService.subscribe(onUpdate, (data) => {
      handleMeasurement(data.measurement);
    });
  },
};

const config = {
  showStudyList: false,
  extensions: [extension],
  servers: {
    dicomWeb: [
      {
        name: "DCM4CHEE",
        wadoUriRoot: "https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/wado",
        qidoRoot: "https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs",
        wadoRoot: "https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs",
        qidoSupportsIncludeField: true,
        imageRendering: "wadors",
        thumbnailRendering: "wadors",
      },
    ],
  },
};

const useOHIFViewer = () => {
  const OHIFViewer = useRef(window.OHIFViewer);
  return OHIFViewer.current;
};

export function Viewer() {
  const OHIFViewer = useOHIFViewer();
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      OHIFViewer.installViewer(config, "ohif-root");
    }
  }, [ref]);
  return <div ref={ref} id="ohif-root" style={{ height: "100vh" }}></div>;
}
