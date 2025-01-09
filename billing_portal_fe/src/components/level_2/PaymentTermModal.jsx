import React, { useState } from "react";
import CustomButton from "../level_1/CustomButton";
import { Box, Modal } from "@mui/material";
import CustomTextField from "../level_1/CustomTextField";
import axios from "axios";
function PaymentTermModal({ paymentTermModal, setPaymentTermModal }) {
  const [paymentTerm, setPaymentTerm] = useState();
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
    setPaymentTermModal(false);
    setPaymentTerm("");
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/payment_terms/",
        { name: paymentTerm },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 201) {
        setPaymentTermModal(false);
        setPaymentMode("");
      } else {
        console.log("Unexpected response:", response.status);
      }
    } catch (error) {
      console.error(
        "Error posting data:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Modal
        open={paymentTermModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-y-[1rem]">
            <CustomTextField
              label="Payment Term"
              value={paymentTerm}
              setValue={setPaymentTerm}
            />
            <CustomButton
              onClick={handleSubmit}
              type="submit"
              sx={{ backgroundColor: "black", color: "white" }}
            >
              Add Payment Term
            </CustomButton>
          </div>
        </Box>
      </Modal>
    </form>
  );
}

export default PaymentTermModal;
