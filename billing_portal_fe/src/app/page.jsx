import Image from "next/image";
import GenerateInvoicePage from "@/components/level_3/GenerateInvoicePage";
import Dashboard from "@/components/level_3/Dashboard";
export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen  bg-black">
      <Dashboard/>
    </div>
  );
}
