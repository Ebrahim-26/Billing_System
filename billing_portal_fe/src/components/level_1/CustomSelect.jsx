import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CustomSelect({
  label,
  data,
  setSelectedData,
  selectedData,
}) {
  const handleChange = (event) => {
    setSelectedData(event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl
        fullWidth
        sx={{
          "& .MuiInputLabel-root": {
            color: "grey",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "black",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "grey",
            },
            "&:hover fieldset": {
              borderColor: "#1f1f1f",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
        }}
      >
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedData || ""}
          label={label}
          onChange={handleChange}
        >
          {data?.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
