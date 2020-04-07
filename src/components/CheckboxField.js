import React, { useState, useEffect } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

export function CheckboxField(props) {
  const { label, checked, ...rest } = props;
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(checked);
  }, [checked]);

  const handleChange = (event) => setState(event.target.checked);

  return (
    <FormControlLabel
      control={<Checkbox {...rest} checked={state} onChange={handleChange} />}
      label={label}
    />
  );
}
