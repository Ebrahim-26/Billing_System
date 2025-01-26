"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from "../level_2/DashboardCard";
import AllClient from "./AllClients";
import axios from "axios";
import ViewServices from "./ViewServices";
import GenerateInvoicePage from "./GenerateInvoicePage";
function Dashboard() {
  const [showClients, setShowClients] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showGenerateInvoice, setShowGenerateInvoice] = useState(false);
  const [serviceList, setServiceList] = useState([]);

  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clients/`,
          {
            withCredentials: true,
          }
        );
        setClientList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/`,
          {
            withCredentials: true,
          }
        );
        setServiceList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log("OCUNT:", clientList.length);
  return (
    <div className="h-full w-[80%] p-10 flex flex-col items-center gap-y-5 ">
      <div className=" flex flex-row gap-5 justify-center w-full">
        <div
          onClick={() => {
            setShowClients((prev) => !prev);
            setShowServices(false);
            setShowGenerateInvoice(false);
          }}
          className="h-full w-full"
        >
          <DashboardCard value={clientList.length || 0} label="Clients" />
        </div>
        <div
          onClick={() => {
            setShowServices((prev) => !prev);
            setShowClients(false);
            setShowGenerateInvoice(false);
          }}
          className="h-full w-full"
        >
          <DashboardCard
            value={serviceList.length || 0}
            label="No of Services"
          />
        </div>
        <div
          className="h-full w-full"
          onClick={() => {
            setShowGenerateInvoice((prev) => !prev);
            setShowClients(false);
            setShowServices(false);
          }}
        >
          <DashboardCard value="150" label="Total Invoices" />
        </div>
        <div className="h-full w-full">
          <DashboardCard value="25000" label="Total Amount" />
        </div>
      </div>
      <div className="w-full ">
        {showClients && (
          <>
            <p className="text-3xl text-white">Clients</p>
            <AllClient clientList={clientList} />
          </>
        )}
      </div>
      <div className="w-full ">
        {showServices && (
          <>
            <p className="text-3xl text-white">Services</p>
            <ViewServices serviceList={serviceList} />
          </>
        )}
      </div>
      <div className="w-full ">
        {showGenerateInvoice && (
          <>
            <p className="text-3xl text-white">Generate Invoice</p>
            <GenerateInvoicePage />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
