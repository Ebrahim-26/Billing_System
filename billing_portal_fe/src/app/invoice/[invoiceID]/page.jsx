"use client";
import Invoice from "@/components/level_3/Invoice";
import React from "react";
import DownloadInvoice from "@/components/level_3/DownloadInvoice";
function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Invoice />
      <DownloadInvoice />
    </div>
  );
}

export default Page;
