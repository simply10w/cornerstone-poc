import { Box } from "@material-ui/core";
import React from "react";
import { LengthForm } from "./LengthForm";
import { AngleForm } from "./AngleForm";
import { AnnotationForm } from "./AnnotationForm";
import { EllipticalRoiForm } from "./EllipticalRoiForm";
import { RectangleRoiForm } from "./RectangleRoiForm";

const registry = {
  Angle: (m) => <AngleForm measurement={m} />,
  Length: (m) => <LengthForm measurement={m} />,
  ArrowAnnotate: (m) => <AnnotationForm measurement={m} />,
  EllipticalRoi: (m) => <EllipticalRoiForm measurement={m} />,
  RectangleRoi: (m) => <RectangleRoiForm measurement={m} />,
};

export function Measurements({ measurements }) {
  const renderMeasurement = (measurement) => {
    const factory = registry[measurement.toolType];
    return factory ? factory(measurement) : null;
  };

  if (!measurements.length) {
    return <h2>No measurements</h2>;
  }

  return (
    <>
      <h2>Measurements</h2>

      {measurements.map((measurement, idx) => (
        <Box mb={3} key={idx}>
          {renderMeasurement(measurement)}
        </Box>
      ))}
    </>
  );
}
