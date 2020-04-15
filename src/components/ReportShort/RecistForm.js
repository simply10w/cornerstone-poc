import React, { useState } from "react";
import {
  Typography,
  makeStyles,
  createStyles,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export function RecistForm() {
  const [adequate, setAdequate] = useState(true);

  return (
    <>
      <Typography variant="body1">
        <b>Disease Indication:</b>
        No Information Found
      </Typography>

      <Typography variant="body1">
        <b>Exam date:</b>
        {new Date().toLocaleDateString()}
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={adequate}
            onChange={() => setAdequate((adequate) => !adequate)}
            name={"adequate"}
            color="primary"
          />
        }
        label={"Are the images technically adequate?"}
      />

      {!adequate && (
        <>
          <Typography variant="body1">
            Give at least one reason for the images being 'Readable, but not
            optimal' or 'Not readable'.
          </Typography>
          <ReasonsList />
        </>
      )}
    </>
  );
}

const REASONS = [
  "Artifact",
  "Inadequate contrast",
  "Inadequate chest",
  "Inadequate abdomen",
  "Inadequate pelvis",
  "Inadequate anatomy",
  "Missing chest",
  "Missing abdomen",
  "Missing pelvis",
  "Missing anatomy",
  "Site drawn ROI or measurement present",
  "Subject motion",
  "Time point missing",
  "Other",
];

const ReasonsList = () => {
  const [state, setState] = useState({});
  return (
    <>
      {REASONS.map((reason) => (
        <FormControlLabel
          key={reason}
          control={
            <Checkbox
              checked={!!state[reason]}
              onChange={() =>
                setState((state) => ({ ...state, [reason]: !state[reason] }))
              }
              name={reason}
              color="primary"
            />
          }
          label={reason}
        />
      ))}
    </>
  );
};
