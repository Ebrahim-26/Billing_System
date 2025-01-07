"use client";
import CustomButton from "@/components/level_1/CustomButton";
import CustomTextField from "@/components/level_1/CustomTextField";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Modal } from "@mui/material";

function CreateService({ open, setOpen, handleClose }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    if (loading) return; // Prevents multiple submissions
    setLoading(true); // Sets loading state to true

    try {
      const payload = {
        name,
        description,
        cost,
        is_available: isChecked,
      };
      const response = await axios.post(
        "http://localhost:8000/api/services/",
        payload // Your payload data
      );

      if (response.status === 201) {
        window.location.reload(); // Correctly reloads the page
      } else {
        console.error("Error generating invoice");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false); // Resets loading state
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[30rem] p-2 gap-4"
        >
          <div className="flex flex-col p-5 border rounded-md border-slate-500 gap-4">
            <CustomTextField
              label="Service Name"
              setValue={setName}
              value={name}
            />
            <CustomTextField
              label="Service Description"
              setValue={setDescription}
              value={description}
            />
            <CustomTextField
              label="Cost"
              type="number"
              setValue={setCost}
              value={cost}
            />
            <div className="flex ">
              <p>Available :</p>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
          <div className="h-[2rem]">
          <CustomButton type="submit" sx={{backgroundColor:'black', color:'white'}}>Create</CustomButton>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default CreateService;
