import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function CustomDatePicker({
  label,
  value,
  setSelectedData,
  readOnly = false,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        readOnly={readOnly}
        sx={{ width: "100%" }}
        label={label}
        value={value}
        onChange={(newValue) => setSelectedData(newValue)}
      />
    </LocalizationProvider>
  );
}
