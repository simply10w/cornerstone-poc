import React from "react";
import { Card, Box, Typography, CardContent, Button } from "@material-ui/core";
import { TextField } from "../FormFields/TextField";
import { CheckboxField } from "../FormFields/CheckboxField";

export function Lesions({ lesions }) {
  const list = lesions.map((lesion, index) => (
    <Card key={index}>
      <Typography variant="h4">Lesion: {lesion.measurementNumber}</Typography>
      <CardContent>
        <p>
          Slice Number of ROI: {lesion.sliceNumber}/{lesion.totalSlices}
        </p>
        <Box mb={3}>
          <TextField name="location" label="Location" value={lesion.location} />
        </Box>

        <Box mb={3}>
          <CheckboxField
            checked={lesion.priorIrradiated}
            label="Previously Irradiated / Prior Surgery Information"
          />
        </Box>

        <Lesion lesion={lesion} />
      </CardContent>
    </Card>
  ));
  return (
    <>
      {list}
      <Button onClick={() => alert("Submitted!")}>Submit</Button>
    </>
  );
}

const TOOLS = {
  Length,
  RectangleRoi,
  EllipticalRoi,
  Bidirectional,
  ArrowAnnotate,
};

function Lesion({ lesion }) {
  const Tool = TOOLS[lesion.toolType];
  if (!Tool) {
    return null;
  }
  return <Tool lesion={lesion} />;
}

function Length({ lesion }) {
  return (
    <Box mb={3}>
      <TextField
        name="length"
        label="Length"
        type="number"
        value={lesion.length}
      />
    </Box>
  );
}

function ArrowAnnotate({ lesion }) {
  return (
    <Box mb={3}>
      <TextField name="annotation" label="Annotation" value={lesion.label} />
    </Box>
  );
}

function RectangleRoi({ lesion }) {
  return (
    <>
      <Box mb={3}>
        <TextField name="area" label="Area" type="number" value={lesion.area} />
      </Box>
    </>
  );
}

function EllipticalRoi({ lesion }) {
  return (
    <>
      <Box mb={3}>
        <TextField name="area" label="Area" type="number" value={lesion.area} />
      </Box>
    </>
  );
}

function Bidirectional({ lesion }) {
  return (
    <>
      <Box mb={3}>
        <TextField
          name="LD"
          label="LD (Long Diameter)"
          type="number"
          value={lesion.longestDiameter}
        />
      </Box>
      <Box mb={3}>
        <TextField
          name="SD"
          label="SD (Short Diameter)"
          type="number"
          value={lesion.shortestDiameter}
        />
      </Box>
    </>
  );
}
