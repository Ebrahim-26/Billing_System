import { TextField } from "@mui/material";
import React from "react";

function CustomTextField({ label, type, variant }) {
  return (
    <TextField
      type={type}
      id="filled-basic"
      label={label}
      variant={variant}
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
