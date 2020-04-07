import { Grid } from "@material-ui/core";
import React from "react";
import { TextField } from "../../TextField";
import { MeasurementLabelling } from "./MeasurementLabelling";

export function AnnotationForm({ measurement }) {
  return (
    <>
      <h3>Annotation</h3>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField label="Anotation" value={measurement.label} />
        </Grid>
        <Grid item xs={12}>
          <MeasurementLabelling measurement={measurement} />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Start X"
            type="number"
            value={measurement.handles.start.x}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Start Y"
            type="number"
            value={measurement.handles.start.y}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="End X"
            type="number"
            value={measurement.handles.end.x}
          />
        </Grid>
        <Grid item xs={3}>
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
