import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// Regular dropdown
export const SelectField = ({
  options,
  label,
  helperText,
  size = "medium",
  disabled,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { value } = meta;

  return (
    <TextField
      {...field}
      disabled={disabled}
      id={label}
      variant="outlined"
      label={label}
      helperText={helperText}
      value={value}
      error={meta.touched && !!meta.error}
      select
      fullWidth
      size={size}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
