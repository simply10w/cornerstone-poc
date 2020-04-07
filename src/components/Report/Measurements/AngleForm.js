import { Grid, InputAdornment } from "@material-ui/core";
import React from "react";
import { TextField } from "../../TextField";
import { MeasurementLabelling } from "./MeasurementLabelling";

export function AngleForm({ measurement }) {
  return (
    <>
      <h3>Angle</h3>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Angle"
            type="number"
            value={measurement.angle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span>&#176;</span>
                </InputAdornment>
              ),
            }}
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
            label="Middle X"
            type="number"
            value={measurement.handles.middle.x}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Middle Y"
            type="number"
            value={measurement.handles.middle.y}
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
