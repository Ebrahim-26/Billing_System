"use client";
import Invoice from "@/components/level_3/Invoice";
import React, { useRef } from "react";
import DownloadInvoice from "@/components/level_3/DownloadInvoice";
import ReactToPrint from 'react-to-print';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";
function Page() {
  const componentRef = useRef();
  const printRef=useRef(null)
  const reactToPrintFn = useReactToPrint({ componentRef });

  const printInvoiceFn= async()=>{
    const dataInvoice=printRef.current
    try{
      const canvas=await html2canvas(dataInvoice);
      const imgData = canvas.toDataURL('image/png')

      const pdf= new jsPDF({
        orientation:'portrait',
        unit:'px',
        format:'a4',
      })
      const width=pdf.internal.pageSize.getWidth()
      const height = (canvas.height/width)/canvas.width;

      pdf.addImage(imgData,'PNG',0,0,width,height)
      pdf.save('Invoice.pdf')
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Invoice printInvoiceFn={printInvoiceFn} />
      {/* <DownloadInvoice /> */}
      <div>
  </div>
    </div>
  );
}

export default Page;
