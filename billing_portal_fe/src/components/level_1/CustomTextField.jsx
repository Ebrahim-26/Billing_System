import { TextField } from "@mui/material";
import React from "react";

function CustomTextField({
  value,
  setValue,
  label,
  type,
  variant,
  readOnly = false,
}) {
  return (
    <TextField
      type={type}
      onChange={(e)=>setValue(e.target.value)}
      id="filled-basic"
      label={label}
      variant={variant}
      value={value || ""}
      InputProps={{
        readOnly: readOnly, // Conditionally apply the readOnly property
      }}
      sx={{
        width: "100%",
        "& label": {
          color: "grey",
        },
        "& label.Mui-focused": {
          color: "black",
        },
        "& .MuiFilledInput-root": {
          backgroundColor: "",
        },
        "& .MuiFilledInput-underline:before": {
          borderBottomColor: "grey",
        },
        "& .MuiFilledInput-underline:after": {
          borderBottomColor: "black",
        },
      }}
    />
  );
}

export default CustomTextField;
