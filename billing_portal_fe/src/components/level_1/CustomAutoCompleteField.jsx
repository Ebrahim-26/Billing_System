import { Autocomplete, TextField } from "@mui/material";
import React from "react";

function CustomSelectField({
  label,
  width,
  data,
  disabled,
  borderRadius,
  setSelectedData,
}) {
  const handleChange = (event, newValue) => {
    setSelectedData(newValue);
  };

  return (
    <div className="w-full transition-all">
      <Autocomplete
        disablePortal
        options={data}
        disabled={disabled}
        onChange={handleChange}
        getOptionLabel={(item) => item}
        renderOption={(props, item) => {
          const { key, ...restProps } = props;
          return (
            <li key={item} {...restProps}>
              {" "}
              {item}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            sx={{
              color: "black",
              width: { width },
              "& label": {
                color: "black",
              },
              "& label.Mui-focused": {
                color: "black", 
              },
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                borderRadius: { borderRadius }, 
                "&.Mui-focused fieldset": {
                  borderColor: "black", 
                },
              },
            }}
          />
        )}
      />
    </div>
  );
}

export default CustomSelectField;
