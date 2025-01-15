"use client";
import CustomButton from "@/components/level_1/CustomButton";
import CustomTextField from "@/components/level_1/CustomTextField";
import React, { useState } from "react";
import axios from "axios";
import { Box, Modal } from "@mui/material";

function CreateClient({ open, handleClose }) {
  const [name, setName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [clientContactNumber, setClientContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [totalSpend, setTotalSpend] = useState("");
  const [businessDomain, setBusinessDomain] = useState(); // Assuming it is a number
  const [note, setNote] = useState("");
  const [usersName, setUsersName] = useState("");
  const [usersEmail, setUsersEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const payload = {
        name,
        gst_number: gstNumber,
        contact_number: contactNumber,
        email,
        address: {
          line1,
          line2,
          city,
          state,
          district,
          pincode,
        },
        total_spend: totalSpend,
        business_domain: businessDomain,
        note,
        user: {
          name: usersName,
          email: usersEmail,
          contact_number: contactNumber,
        },
      };

      const response = await axios.post(
        "http://localhost:8000/api/clients/",
        payload
      );

      if (response.status === 201) {
        window.location.reload();
      } else {
        console.error("Error posting data");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-46.5%, -50%)",
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
          className="flex flex-col w-auto p-2 gap-4"
        >
          <div className="flex flex-col p-5 border rounded-md border-slate-500 gap-4">
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Companies Detail
            </p>
            <div className="grid grid-cols-4 gap-3">
              <CustomTextField label="Name*" setValue={setName} value={name} />
              <CustomTextField
                label="GST Number*"
                setValue={setGstNumber}
                value={gstNumber}
              />
              <CustomTextField
                label="Contact Number*"
                setValue={setContactNumber}
                value={contactNumber}
              />
              <CustomTextField
                label="Email*"
                setValue={setEmail}
                value={email}
              />
              <CustomTextField
                label="Address Line 1*"
                setValue={setLine1}
                value={line1}
              />
              <CustomTextField
                label="Address Line 2"
                setValue={setLine2}
                value={line2}
              />
              <CustomTextField label="City*" setValue={setCity} value={city} />
              <CustomTextField
                label="State*"
                setValue={setState}
                value={state}
              />
              <CustomTextField
                label="District*"
                setValue={setDistrict}
                value={district}
              />
              <CustomTextField
                label="Pincode*"
                setValue={setPincode}
                value={pincode}
              />
              <CustomTextField
                label="Total Spend"
                type="number"
                setValue={setTotalSpend}
                value={totalSpend}
              />
              <CustomTextField label="Note" setValue={setNote} value={note} />
            </div>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Client&#39;s Detail
            </p>

            <div className="grid grid-cols-3 gap-3">
              <CustomTextField
                label="Client&#39;s Name*"
                setValue={setUsersName}
                value={usersName}
              />
              <CustomTextField
                label="Email*"
                setValue={setUsersEmail}
                value={usersEmail}
              />
              <CustomTextField
                label="Contact Number*"
                setValue={setClientContactNumber}
                value={clientContactNumber}
              />
            </div>
          </div>
          <div className="h-[3rem]">
            <CustomButton
              type="submit"
              sx={{ backgroundColor: "black", color: "white" }}
            >
              Create
            </CustomButton>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default CreateClient;
