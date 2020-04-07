import { Box, Card, CardContent, makeStyles } from "@material-ui/core";
import React from "react";
import { TextField } from "../TextField";
import { Measurements } from "./Measurements/Measurements";
import { ViewportInfo } from "./ViewportInfo";

const usePanelFormStyles = makeStyles({
  ActiveTitle: {
    color: "#20a5d6",
  },
});

export function PanelForm({ panel, index, isActive }) {
  const classes = usePanelFormStyles();
  return (
    <Card raised={true}>
      <CardContent>
        <h2 className={isActive ? classes.ActiveTitle : null}>
          Screen {index + 1} ({panel.CurrentStackImage + 1}/{panel.TotalImages})
        </h2>
        <Box mb={3}>
          <TextField
            name="SeriesInstanceUID"
            label="Serie UID"
            value={panel.SeriesInstanceUID}
            disabled={true}
          />
        </Box>
        <Box mb={3}>
          <TextField
            name="SOPInstanceUID"
            label="SOP UID"
            value={panel.SOPInstanceUID}
            disabled={true}
          />
        </Box>
        <Box mb={3}>
          <TextField
            name="Modality"
            label="Modality"
            disabled={true}
            value={panel.Modality}
          />
        </Box>
        <ViewportInfo view={panel.View} />
        <Measurements measurements={panel.Measurements} />
      </CardContent>
    </Card>
  );
}
