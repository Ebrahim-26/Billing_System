import Image from "next/image";
import GenerateInvoicePage from "@/components/level_3/GenerateInvoicePage";
import { TextField } from "@mui/material";
import LoginForm from "@/components/level_2/LoginForm";
export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <GenerateInvoicePage />
      </div>
    </div>
  );
}
