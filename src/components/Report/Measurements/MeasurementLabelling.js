import { Grid } from "@material-ui/core";
import React from "react";
import { TextField } from "../../TextField";

export function MeasurementLabelling({ measurement }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TextField
          name="Location"
          label="Location"
          value={measurement.location}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="Description"
          label="Description"
          value={measurement.description}
        />
      </Grid>
    </Grid>
  );
}
