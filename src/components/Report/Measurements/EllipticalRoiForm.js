import { Grid } from "@material-ui/core";
import React from "react";
import { TextField } from "../../FormFields/TextField";
import { MeasurementLabelling } from "./MeasurementLabelling";

export function EllipticalRoiForm({ measurement }) {
  return (
    <>
      <h3>Elliptical Roi</h3>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField label="Area" type="number" value={measurement.area} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Mean" type="number" value={measurement.mean} />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Standard Deviation"
            type="number"
            value={measurement.stdDev}
          />
        </Grid>
        <Grid item xs={12}>
          <MeasurementLabelling measurement={measurement} />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Start X"
            type="number"
            value={measurement.handles.start.x}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Start Y"
            type="number"
            value={measurement.handles.start.y}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="End X"
            type="number"
            value={measurement.handles.end.x}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="End Y"
            type="number"
            value={measurement.handles.end.y}
          />
        </Grid>
      </Grid>
    </>
  );
}
