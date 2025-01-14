"use client";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAutoCompleteField from "../level_1/CustomAutoCompleteField";
import CustomCounter from "../level_1/CustomCounter";
import CustomButton from "../level_1/CustomButton";
import CustomSelect from "../level_1/CustomSelect";
import CustomDatePicker from "../level_1/CustomDatePicker";
import CustomTextField from "../level_1/CustomTextField";
import dayjs from "dayjs";
import axios from "axios";
import { useGlobal } from "@/context/GlobalContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/navigation";
import PaymentModeModal from "../level_2/PaymentModeModal";
import PaymentTermModal from "../level_2/PaymentTermModal";
function GenerateInvoicePage() {
  const router = useRouter();
  const { loginOpen } = useGlobal();
  const [selectedService, setSelectedService] = useState();
  const [paymentMode, setPaymentMode] = useState();
  const [paymentTerm, setPaymentTerm] = useState(1);
  const [selectedAuthorizer, setSelectedAuthorizer] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [counter, setCounter] = useState(1);
  const [date, setDate] = useState(dayjs());
  const [estimationDate, setEstimationDate] = useState();
  const [selectedServiceList, setSelectedServiceList] = useState([]);
  const [paidAmount, setPaidAmount] = useState();
  const [paymentModeModal, setPaymentModeModal] = useState(false);
  const [paymentTermModal, setPaymentTermModal] = useState(false);

  //Data from Api
  const [invoiceDropdownData, setInvoiceDropdownData] = useState();
  const [serviceLoad, setServiceLoad] = useState([]);
  const [loading, setLoading] = useState(false);
  function generateInitials(name) {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    } else {
      return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get-invoice-fields/",
          {
            withCredentials: true,
          }
        );
        setInvoiceDropdownData(response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      } finally {
      }
    };
    fetchData();
  }, [loginOpen]);

  const [apiData, setApiData] = useState({
    number: null,
    date: null,
    client_id: null,
    service_details: null,
    payment_mode_id: null,
    payment_term_id: null,
    estimated_completion_date: null,
    authorizer_id: null,
    total_amount: "0.00",
    status: "unsettled",
  });

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = selectedServiceList.reduce(
        (sum, service) => sum + service.cost * service.quantity,
        0
      );
      setApiData((prevState) => ({
        ...prevState,
        total_amount: total.toFixed(2),
      }));
    };

    calculateTotalAmount();
  }, [selectedServiceList]);

  useEffect(() => {
    if (invoiceDropdownData && selectedClient) {
      setApiData((prevState) => ({
        ...prevState,
        number: `${generateInitials(selectedClient?.name)}${
          invoiceDropdownData.invoice_number
        }`,
        date: date?.format("YYYY-MM-DD"),
        client_id: selectedClient.id,
        payment_mode_id: paymentMode,
        payment_term_id: paymentTerm,
        estimated_completion_date: estimationDate?.format("YYYY-MM-DD"),
        authorizer_id: selectedAuthorizer,
      }));
    }
  }, [
    invoiceDropdownData,
    selectedClient,
    date,
    paymentMode,
    paymentTerm,
    estimationDate,
    selectedAuthorizer,
  ]);

  useEffect(() => {
    //To updated the total amount to the apiData
    setApiData((prevState) => ({
      ...prevState,
      amount_paid: paidAmount || "0.00",
    }));
  }, [paidAmount]);

  useEffect(() => {
    setApiData((prevState) => ({
      ...prevState,
      service_details: [...serviceLoad],
    }));
  }, [serviceLoad]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/invoices/",
        apiData
      );
      if (response.status === 201) {
        router.push(`invoice/${response.data.id}`);
      } else {
        console.log("Error generating invoice");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Failed to generate invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} >
      <div className="p-10 w-[100%] border-2 border-black rounded-md shadow-2xl">
        <div className="flex gap-5 w-[100%]">
          <CustomTextField
            id="filled-basic"
            label="Invoice Number"
            variant="filled"
            value={apiData?.number || ""}
            readOnly
          />
          <CustomDatePicker
            label="Date"
            value={date}
            setSelectedData={setDate}
            readOnly
          />
        </div>
        <div className="my-5 ">
          <CustomAutoCompleteField
            setSelectedData={setSelectedClient}
            label="Select Clients"
            data={invoiceDropdownData?.clients}
          />
        </div>
        <div>
          <div className="flex my-5 gap-5">
            <div className="w-[100%]">
              <CustomAutoCompleteField
                setSelectedData={setSelectedService}
                label="Services"
                data={invoiceDropdownData?.services}
              />
            </div>
            <CustomCounter counter={counter} setCounter={setCounter} />
            <div className="">
              <CustomButton
                type="button"
                onClick={() => {
                  const existingServiceIndex = selectedServiceList.findIndex(
                    (item) => item.name === selectedService.name
                  );
                  if (existingServiceIndex !== -1) {
                    const updatedServiceList = [...selectedServiceList];
                    updatedServiceList[existingServiceIndex].quantity +=
                      counter;
                    setSelectedServiceList(updatedServiceList);
                    const updatedServiceLoad = [...serviceLoad];
                    updatedServiceLoad[existingServiceIndex].quantity +=
                      counter;
                    setServiceLoad(updatedServiceLoad);
                  } else {
                    setSelectedServiceList((prev) => [
                      ...prev,
                      {
                        service_id: selectedService.id,
                        quantity: counter,
                        cost: selectedService.cost,
                        name: selectedService.name,
                      },
                    ]);

                    setServiceLoad((prev) => [
                      ...prev,
                      {
                        service_id: selectedService.id,
                        quantity: counter,
                      },
                    ]);
                  }

                  setCounter(1);
                }}
                sx={{ backgroundColor: "#b7b7b7", color: "#181818" }}
              >
                Add
              </CustomButton>
            </div>
          </div>
          {selectedServiceList && (
            <div className="gap-y-2 rounded-md">
              {selectedServiceList.map((item, index) => (
                <div key={index} className="flex gap-4 my-2">
                  <div className="text-slate-900 bg-slate-200 rounded-md p-4 w-[80%] text-center">
                    {item.name}
                  </div>
                  <div className="text-slate-200 bg-slate-600 rounded-md p-4 w-[10%] text-center">
                    {item.quantity}
                  </div>
                  <div className="w-[10%]">
                    <CustomButton
                      onClick={() => {
                        setSelectedServiceList((prevList) =>
                          prevList.filter((_, i) => i !== index)
                        );

                        setServiceLoad((prevLoad) =>
                          prevLoad.filter((_, i) => i !== index)
                        );
                      }}
                      sx={{ backgroundColor: "#1f1f1f", color: "white" }}
                      startIcon={<DeleteOutlineIcon />}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex my-5 gap-x-5">
          <div className="w-[100%]">
            <CustomSelect
              setSelectedData={(newValue) => setPaymentMode(newValue)}
              data={invoiceDropdownData?.payment_modes}
              label="Payment Mode"
              selectedData={paymentMode}
            />
          </div>
          <div>
            <CustomButton
              onClick={() => setPaymentModeModal(true)}
              sx={{ color: "white", backgroundColor: "black" }}
              type="button"
            >
              Add Mode
            </CustomButton>
            <PaymentModeModal
              paymentModeModal={paymentModeModal}
              setPaymentModeModal={setPaymentModeModal}
            />
          </div>
          <div className="w-[100%]">
            <CustomSelect
              setSelectedData={setPaymentTerm}
              data={invoiceDropdownData?.payment_terms}
              label="Payment Term"
              selectedData={paymentTerm}
            />
            <PaymentTermModal
              paymentTermModal={paymentTermModal}
              setPaymentTermModal={setPaymentTermModal}
            />
          </div>
          <div>
            <CustomButton
              onClick={() => setPaymentTermModal(true)}
              sx={{ color: "white", backgroundColor: "black" }}
              type="button"
            >
              Add Term
            </CustomButton>
          </div>
        </div>
        <div className="my-5">
          <CustomDatePicker
            label="Estimated Completion By"
            value={estimationDate}
            setSelectedData={setEstimationDate}
          />
        </div>
        <div className="my-5">
          <CustomSelect
            setSelectedData={setSelectedAuthorizer}
            data={invoiceDropdownData?.authorizer}
            label="Authorized By"
            selectedData={selectedAuthorizer}
          />
        </div>
        <div className="flex gap-x-5">
          <CustomTextField
            type="number"
            id="filled-basic"
            label="Amount"
            variant="filled"
            value={apiData.total_amount}
            readOnly
          />

          <CustomTextField
            type="number"
            id="filled-basic"
            label="Paid"
            variant="filled"
            setValue={(value) => {
              const sanitizedValue = parseFloat(value) || 0; // Ensure value is a valid number
              if (sanitizedValue <= parseFloat(apiData.total_amount)) {
                setPaidAmount(sanitizedValue); // Only set if within the total amount
              } else {
                alert("Paid amount cannot exceed the total amount."); // Optional alert for user feedback
              }
            }}
            value={paidAmount}
          />
          <CustomTextField
            type="number"
            id="filled-basic"
            label="Due"
            variant="filled"
            value={
              parseFloat(apiData.total_amount) - (parseFloat(paidAmount) || 0)
            }
            readOnly
          />
        </div>
        <div className="bg-black mt-5 h-[5rem]  rounded-sm ">
          <CustomButton sx={{ color: "white" }} type="submit">
            Generate
          </CustomButton>
        </div>
      </div>
    </form>
  );
}

export default GenerateInvoicePage;
