import React, { useState, useEffect } from "react";
import MuiTextField from "@material-ui/core/TextField";

// Regular text field
export const TextField = (props) => {
  const { value, ...rest } = props;
  const [state, setState] = useState("");
  useEffect(() => {
    setState(value);
  }, [value]);
  return (
    <MuiTextField
      {...rest}
      onChange={(event) => setState(event.target.value)}
      value={state}
      fullWidth
      variant="outlined"
    />
  );
};
