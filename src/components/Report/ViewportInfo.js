import { Grid } from "@material-ui/core";
import React from "react";
import { CheckboxField } from "../CheckboxField";
import { TextField } from "../TextField";

export function ViewportInfo({ view }) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <TextField name="WW" label="WW" type="number" value={view.WW} />
      </Grid>
      <Grid item xs={4}>
        <TextField name="WC" label="WC" type="number" value={view.WC} />
      </Grid>
      <Grid item xs={4}>
        <TextField
          name="Scale"
          label="Scale"
          type="number"
          value={view.Scale}
        />
      </Grid>

      <Grid item xs={4}>
        <CheckboxField checked={view.Invert} label={"Is inverted"} />
      </Grid>
      <Grid item xs={4}>
        <CheckboxField checked={view.VFlip} label={"Vertically flipped"} />
      </Grid>
      <Grid item xs={4}>
        <CheckboxField checked={view.HFlip} label={"Horizontally Flipped"} />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="TranslatedX"
          label="Translated X"
          type="number"
          value={view.Translation.x}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="TranslatedY"
          label="Translated Y"
          type="number"
          value={view.Translation.y}
        />
      </Grid>
    </Grid>
  );
}
