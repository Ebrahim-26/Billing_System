"use client";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomAutoCompleteField from "../level_1/CustomAutoCompleteField";
import CustomCounter from "../level_1/CustomCounter";
import CustomButton from "../level_1/CustomButton";
import CustomSelect from "../level_1/CustomSelect";
import CustomDatePicker from "../level_1/CustomDatePicker";
import CustomTextField from "../level_1/CustomTextField";

function GenerateInvoicePage() {
  const [selectedClient, setSelectedClient] = useState();
  const [selectedService, setSelectedService] = useState();
  const [paymentMode, setPaymentMode] = useState("upi");
  const [paymentTerm, setPaymentTerm] = useState("Post Payment");
  const [selectedAuthorizer, setSelectedAuthorizer] = useState("Ebrahim");
  const [counter, setCounter] = useState(1);
  const [date, setData] = useState();
  const [estimationDate, setEstimationDate] = useState();
  const [selectedServiceList, setSelectedServiceList] = useState([]);
  const clientNames = [
    "Alice Johnson",
    "Bob Smith",
    "Catherine Davis",
    "Daniel Brown",
    "Emily Wilson",
    "Frank Thompson",
    "Grace Lee",
    "Henry Miller",
    "Isabella Garcia",
    "Jack Martinez",
  ];
  useEffect(() => {
    setSelectedService(null);
  }, [setSelectedService]);
  const services = ["Elite", "Premium", "Basic"];
  const paymentModes = [
    { value: "upi", label: "UPI" },
    { value: "cash", label: "Cash" },
  ];
  const paymentTerms = [
    { value: "Pre Payment", label: "Pre Payment" },
    { value: "Post Payment", label: "Post Payment" },
  ];
  const authorizer = [
    { value: "Ebrahim", label: "Ebrahim" },
    { value: "Shahil", label: "Shahil" },
  ];

  return (
    <div className="p-10 w-[100%]">
      <div className="flex gap-5 w-[100%]">
        <CustomTextField
          id="filled-basic"
          label="Invoice Number"
          variant="filled"
        />
        <CustomDatePicker label="Date" value={date} setSelectedData={setData} />
      </div>
      <div className="my-5 ">
        <CustomAutoCompleteField
          setSelectedData={setSelectedClient}
          label="Select Clients"
          data={clientNames}
        />
      </div>
      <div>
        <div className="flex my-5 gap-5">
          <div className="w-[100%]">
            <CustomAutoCompleteField
              setSelectedData={setSelectedService}
              label="Services"
              data={services}
            />
          </div>
          <CustomCounter counter={counter} setCounter={setCounter} />
          <div className="">
            <CustomButton
              onClick={() => {
                setSelectedServiceList((prev) => [
                  ...prev,
                  {
                    service: selectedService,
                    quantity: counter,
                  },
                ]);
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
            {selectedServiceList.map((item) => (
              <>
                <div className="flex gap-4 my-2">
                  <div className="text-slate-900 bg-slate-200 rounded-md p-4 w-[20%] text-center">
                    {item.service}
                  </div>
                  <div className="text-slate-200 bg-slate-600 rounded-md p-4 w-[5rem] text-center">
                    {item.quantity}
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
      <div className="flex my-5 gap-x-5">
        <div className="w-[100%]">
          <CustomSelect
            setSelectedData={(newValue) => setPaymentMode(newValue)}
            data={paymentModes}
            label="Payment Mode"
            selectedData={paymentMode}
          />
        </div>
        <div className="w-[100%]">
          <CustomSelect
            setSelectedData={setPaymentTerm}
            data={paymentTerms}
            label="Payment Term"
            selectedData={paymentTerm}
          />
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
          data={authorizer}
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
        />

        <CustomTextField
          type="number"
          id="filled-basic"
          label="Paid"
          variant="filled"
        />
        <CustomTextField
          type="number"
          id="filled-basic"
          label="Due"
          variant="filled"
        />
      </div>
      <div className="bg-slate-500 mt-5 h-[5rem]  rounded-sm ">
        <CustomButton sx={{ color: "white" }}>Generate</CustomButton>
      </div>
    </div>
  );
}

export default GenerateInvoicePage;
