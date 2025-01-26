import React from "react";
import DashboardCard from "../level_2/DashboardCard";
import AllClient from "./AllClients";
function Dashboard() {
  return (
    <div className="h-full w-[80%] p-10 flex flex-col items-center gap-y-5 text-white">
      <div className=" flex flex-row gap-5 justify-center w-full ">
        <DashboardCard value="10" label="Clients" route="clients" />
        <DashboardCard value="3" label="No of Services" route="services" />
        <DashboardCard
          value="150"
          label="Total Invoices"
          route="generate-invoice"
        />
        <DashboardCard
          value="25000"
          label="Total Amount"
          route="all-invoices"
        />
      </div>
      <div className="h-full w-full">
        <p className="text-3xl">Clients</p>
        <AllClient />
      </div>
    </div>
  );
}

export default Dashboard;
