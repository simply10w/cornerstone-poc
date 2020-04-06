import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { toPairs, size } from "lodash";

const TYPES = {
  Angle: "Angle",
  Length: "Length",
  ArrowAnnotate: "ArrowAnnotate",
  RectangleRoi: "RectangleRoi",
  EllipticalRoi: "EllipticalRoi",
  CircleRoi: "CircleRoi",
  FreehandMouse: "FreehandMouse",
};

const allowedMeasurements = new Set([
  TYPES.ArrowAnnotate,
  TYPES.Length,
  TYPES.EllipticalRoi,
  TYPES.CircleRoi,
  TYPES.RectangleRoi,
  TYPES.Angle,
  TYPES.FreehandMouse,
]);

export function Form({ base, measurements, viewport }) {
  const MeasurmentTypes = toPairs(measurements)
    .filter(([type, ms]) => allowedMeasurements.has(type) && size(ms) > 0)
    .map(([type, items], index) => (
      <MeasurementType type={type} items={items} key={index} />
    ));

  return (
    <div style={{ textAlign: "left" }}>
      <BaseInfo base={base} />
      <ViewportInfo viewport={viewport} />
      {MeasurmentTypes}
      {/* <form noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </form> */}
    </div>
  );
}

const registry = {
  [TYPES.Length]: (item) => <LengthForm item={item} />,
  [TYPES.Angle]: (item) => <LengthForm item={item} />,
  [TYPES.ArrowAnnotate]: (item) => <LengthForm item={item} />,
  [TYPES.EllipticalRoi]: (item) => <LengthForm item={item} />,
  [TYPES.FreehandMouse]: (item) => <LengthForm item={item} />,
  [TYPES.RectangleRoi]: (item) => <LengthForm item={item} />,
  [TYPES.CircleRoi]: (item) => <LengthForm item={item} />,
};

function BaseInfo({ base }) {
  return (
    <>
      <p>
        <b>Study:</b> {base.StudyInstanceUID}
      </p>
    </>
  );
}

function ViewportInfo({ viewport }) {
  return (
    <>
      <p>
        <b>WW:</b> {viewport.WW}
      </p>
      <p>
        <b>WC:</b> {viewport.WC}
      </p>
      <p>
        <b>Scale:</b> {viewport.scale}
      </p>
      <p>
        <b>Is inverted:</b> {viewport.invert ? "Yes" : "No"}
      </p>
      <p>
        <b>Is horizontally flipped:</b> {viewport.hflip ? "Yes" : "No"}
      </p>
      <p>
        <b>Is vertically flipped:</b> {viewport.vflip ? "Yes" : "No"}
      </p>
      <p>
        <b>Translated(x,y):</b>{" "}
        {`${viewport.translation.x}, ${viewport.translation.y}`}
      </p>
    </>
  );
}
function LengthForm({ item }) {
  return (
    <>
      <h3>Length</h3>
      <p>
        <b>SOPInstanceUID:</b> {item.SOPInstanceUID}
      </p>
      <p>
        <b>SeriesInstanceUID:</b> {item.SeriesInstanceUID}
      </p>
      <p>
        <b>PatientID:</b> {item.PatientID}
      </p>
      <p>
        <b>Size:</b> {`${item.length} ${item.unit || ""}`}
      </p>
      <p>
        <b>Start(x,y):</b> {`${item.handles.start.x}, ${item.handles.start.y}`}
      </p>
      <p>
        <b>End(x,y):</b> {`${item.handles.end.x}, ${item.handles.end.y}`}
      </p>
    </>
  );
}

function MeasurementType({ type, items }) {
  const factory = registry[type];
  return (
    <>
      {items.map((item, idx) => (
        <div key={idx}>{factory(item)}</div>
      ))}
    </>
  );
}

/**
 * 
 * RectangleRoi, "EllipticalRoi"
 * handles: 
 *    start: {x: 171.23076923076925, y: 307.69230769230774 }
 *    end: {x: 368.1538461538462, y: 370.0512820512821 }
 *    initialRotation?: 0
 * cachedStats:
      area: 24890.073910034615
      count: 25012
      mean: 214.29158004158003
      variance: 1433.0076965759217
      stdDev: 37.85508812003905
      min: 30
      max: 255
      meanStdDevSUV: undefined
 */
