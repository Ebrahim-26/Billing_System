"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ListItemButton } from "@mui/material";

function page() {
  const [allInvoiceData, setAllInvoiceData] = useState();
  //Dummy Data
  const apiData = [
    {
      id: 1,
      number: "SM001",
      client_name: "Shahil Malik",
      total_amount: "200.00",
      status: "unsettled",
      due: null,
    },
    {
      id: 2,
      number: "DE002",
      client_name: "Desire",
      total_amount: "1500.00",
      status: "unsettled",
      due: 1,
    },
    {
      id: 1,
      number: "SM001",
      client_name: "Shahil Malik",
      total_amount: "200.00",
      status: "unsettled",
      due: null,
    },
    {
      id: 2,
      number: "DE002",
      client_name: "Desire",
      total_amount: "1500.00",
      status: "unsettled",
      due: 1,
    },
    {
      id: 1,
      number: "SM001",
      client_name: "Shahil Malik",
      total_amount: "200.00",
      status: "unsettled",
      due: null,
    },
    {
      id: 2,
      number: "DE002",
      client_name: "Desire",
      total_amount: "1500.00",
      status: "unsettled",
      due: 1,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/invoices/");
        setAllInvoiceData(response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      } finally {
      }
    };
    fetchData();
  }, []);
  console.log("allInvoiceData:", allInvoiceData);
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-[80vw] border-1 border-black">
        <div className="flex bg-slate-500 m-2 h-[4rem] w-full rounded-sm justify-around items-center font-bold ">
          <div className="flex-1 text-center">Invoice Number</div>
          <div className="flex-1 text-center">Client Name</div>
          <div className="flex-1 text-center">Total Amount</div>
          <div className="flex-1 text-center">Status</div>
        </div>
        <div className="flex flex-col">
          {apiData.map((item, index) => (
            <ListItemButton
              key={index}
              className="flex bg-slate-200 m-2 h-[4rem] w-full rounded-sm justify-around items-center cursor-pointer "
            >
              <div className="flex-1 text-center overflow-hidden whitespace-nowrap font-bold">
                {item.number}
              </div>
              <div className="flex-1 text-center overflow-hidden whitespace-nowrap font-bold">
                {item.client_name}
              </div>
              <div className="flex-1 text-center overflow-hidden whitespace-nowrap font-bold">
                {item.total_amount}
              </div>
              <div className="flex-1 text-center overflow-hidden whitespace-nowrap font-bold">
                {item.status}
              </div>
            </ListItemButton>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
