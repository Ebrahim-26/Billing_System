import React, { useState } from "react";
import CustomButton from "../level_1/CustomButton";
import { Box, Modal } from "@mui/material";
import CustomTextField from "../level_1/CustomTextField";
import axios from "axios";
function PaymentModeModal({ paymentModeModal, setPaymentModeModal }) {
  const [paymentMode, setPaymentMode] = useState();
  const [loading, setLoading] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };
  const handleClose = () => {
    setPaymentModeModal(false);
    setPaymentMode("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit triggered");
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/payment_modes/",
        { name: paymentMode },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 201) {
        alert("Successfully added");
        setPaymentMode(""); // Clear the input field
      } else {
        console.log("Unexpected response:", response.status);
      }
    } catch (error) {
      console.error(
        "Error posting data:",
        error.response?.data || error.message
      );
      alert("Failed to add payment mode. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Modal
        open={paymentModeModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-y-[1rem]">
            <CustomTextField
              label="Payment Mode"
              value={paymentMode}
              setValue={setPaymentMode}
            />
            <CustomButton
              type="submit"
              sx={{ backgroundColor: "black", color: "white" }}
            >
              Add Payment Mode
            </CustomButton>
          </div>
        </Box>
      </Modal>
    </form>
  );
}

export default PaymentModeModal;
