"use client";
import CreateService from "@/components/level_2/CreateService";
import ViewServices from "@/components/level_3/ViewServices";
import React from "react";
import { useState } from "react";

function page() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex items-center justify-center w-[100%] h-[100vh]">
      <ViewServices onClick={handleOpen} />
      <CreateService handleClose={handleClose} open={open} />
    </div>
  );
}

export default page;
