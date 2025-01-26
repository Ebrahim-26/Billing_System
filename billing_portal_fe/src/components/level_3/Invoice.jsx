"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fontStyle } from "../style/fontStyle";
import { useParams } from "next/navigation";
import axios from "axios";

function Invoice() {
  const [invoiceData, setInvoiceData] = useState();
  const params = useParams();
  const invoiceID = params.invoiceID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/invoices/${invoiceID}/`,
          {
            withCredentials: true,
          }
        );
        setInvoiceData(response?.data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };
    fetchData();
  }, []);
  const style = fontStyle();
  return (
    <div className="w-[210mm] h-[297mm] p-[20px] relative">
      <div className="flex justify-between">
        <div className="pl-3 mb-2">
          <Image src="/logo/tarvizLogo.png" width={65} height={66} alt="Logo" />
        </div>
        <div>
          <p style={{ fontSize: "14pt", fontWeight: "bold" }}>INVOICE</p>
          <div className="flex flex-col items-end">
            <p style={style.invoicePara}>{invoiceData?.number}</p>
            <p style={style.invoicePara}>{invoiceData?.date}</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div>
          <p style={style.invoiceMain}>Tarviz DigiMart</p>
          <p style={style.invoicePara}>Nungamabam, Chennai </p>
          <p style={style.invoicePara}>+91 9876543210</p>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div>
          <p style={style.invoiceMain}>Bill To:</p>
          <p style={style.invoiceMain}>{invoiceData?.client.name}</p>
          <p style={style.invoicePara}>{invoiceData?.client.gst_number}</p>
          <div className="w-[9rem]">
            <p style={style.invoicePara}>
              {invoiceData?.client?.address?.line1},
              {invoiceData?.client?.address?.line2},
              {invoiceData?.client?.address?.city},
              {invoiceData?.client?.address?.state},
              {invoiceData?.client?.address?.district},
              {invoiceData?.client?.address?.pincode}
            </p>
          </div>
          <p style={style.invoicePara}>{invoiceData?.client.email}</p>
          <p style={style.invoicePara}>{invoiceData?.client.contact_number}</p>
        </div>
        <div className="flex items-end">
          <div className="flex flex-col items-center">
            <p className="flex justify-between items-center w-full gap-x-2" style={style.invoiceMain}>
              <span style={style.invoiceMain}>Payment Term: </span>
              <span style={style.invoicePara}>{invoiceData?.payment_term.name}</span>
            </p>
            <p className="flex justify-between items-center w-full gap-x-2" style={style.invoiceMain}>
              <span style={style.invoiceMain}>Payment Mode: </span>
              <span style={style.invoicePara}>{invoiceData?.payment_mode.name}</span>
            </p>
          </div>
        </div>
      </div>
      {/* Table Area */}
      <div className="mb-4">
        <table className="table-auto w-full border-b border-collapse">
          <thead>
            <tr style={style.invoiceMain} className="bg-gray-100">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Services</th>
              <th className="px-4 py-2 text-left">Qty</th>
              <th className="px-4 py-2 text-left">Rate</th>
              <th className="px-4 py-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody style={style.invoicePara}>
            {invoiceData?.services.map((item, index) => (
              <tr key={index}>
                <td className="border-b px-4 py-2">{index + 1}</td>
                <td className="border-b px-4 py-2">{item?.service_name}</td>
                <td className="border-b px-4 py-2">{item?.quantity}</td>
                <td className="border-b px-4 py-2">{item?.cost}</td>
                <td className="border-b px-4 py-2">{item.cost * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <div>
          <p style={style.invoiceMain}>Estimated Completion By: </p>
          <p style={style.invoicePara}>{invoiceData?.estimated_completion_date}</p>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <p className="flex justify-between items-center w-full gap-x-2" style={style.invoiceMain}>
              <span>Sub Total</span>
              <span style={style.invoicePara}>{(invoiceData?.total_amount * 0.82).toFixed(2)}</span>
            </p>
            <p className="flex justify-between w-full items-center" style={style.invoiceMain}>
              <span>GST</span>
              <span style={style.invoicePara}>18%</span>
            </p>
            <p className="flex justify-between w-full items-center" style={style.invoiceMain}>
              <span>Total</span>
              <span style={style.invoicePara}>{invoiceData?.total_amount}</span>
            </p>
            <p className="flex justify-between w-full items-center" style={style.invoiceMain}>
              <span>Paid</span>
              <span style={style.invoicePara}>{invoiceData?.amount_paid}</span>
            </p>
            <p className="flex justify-between w-full items-center" style={style.invoiceMain}>
              <span>Due</span>
              <span style={style.invoicePara}>{invoiceData?.due}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5">
        <div>
          <p style={style.invoiceMain}>Banking Details:</p>
          <p style={style.invoiceMain}>Account Number:</p>
          <p style={style.invoiceMain}>Bank:</p>
          <p style={style.invoiceMain}>IFSC:</p>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
