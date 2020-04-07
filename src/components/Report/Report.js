import { Box, Paper } from "@material-ui/core";
import React from "react";
import { TextField } from "../TextField";
import { Panels } from "./Panels";

export function Report({ report }) {
  return (
    <div style={{ textAlign: "left" }}>
      <Paper variant="outlined">
        <Box p={2}>
          <Box mb={3}>
            <TextField
              name="StudyInstanceUID"
              label="Study UID"
              value={report.StudyInstanceUID}
              disabled={true}
            />
          </Box>
          <Box mb={3}>
            {report.PatientID && (
              <TextField
                name="PatientId"
                label="Patient ID"
                value={report.PatientID}
                disabled={true}
              />
            )}
          </Box>
          <Panels panels={report.panels} active={report.activePanel} />
        </Box>
      </Paper>
    </div>
  );
}
