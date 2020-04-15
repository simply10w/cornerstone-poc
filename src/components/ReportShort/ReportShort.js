import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { RecistForm } from "./RecistForm";
import { Lesions } from "./Lesions";

export function ReportShort({ report }) {
  const lesions = report.panels
    .flatMap((panel) => {
      const sliceNumber = panel.CurrentStackImage + 1;
      const totalSlices = panel.TotalImages;
      const priorIrradiated = false;
      return panel.Measurements.flatMap((m) => ({
        ...m,
        sliceNumber,
        totalSlices,
        priorIrradiated,
      }));
    })
    .sort((l1, l2) => l1.measurementNumber - l2.measurementNumber);

  return (
    <div style={{ textAlign: "left" }}>
      <Typography variant="h3">Baseline Form</Typography>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <RecistForm />
        </Grid>
        <Grid item xs={12}>
          <Lesions lesions={lesions} />
        </Grid>
      </Grid>
    </div>
  );
}
