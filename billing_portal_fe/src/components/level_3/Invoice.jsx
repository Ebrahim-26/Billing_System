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
          `http://localhost:8000/api/invoices/${invoiceID}/`,
          {
            withCredentials: true,
          }
        );
        setInvoiceData(response?.data);
      } catch (error) {
        console.error("Error posting data:", error);
      } finally {
      }
    };
    fetchData();
  }, []);
  const style = fontStyle();
  return (
    <div className="w-[14.8cm] h-[21cm] p-[20px] bg-white shadow-2xl">
      <div className="flex justify-between">
        <div className="pl-3 mb-2">
          <Image src="/logo/tarvizLogo.png" width={65} height={66} />
        </div>
        <div>
          <p style={{ fontSize: "14px", fontWeight: "bold" }}>INVOICE</p>
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
        <div className="flex justify-end items-end">
          <div>
            <p style={style.invoiceMain}>Payment Term: </p>
            <p style={style.invoiceMain}>Payment Mode: </p>
          </div>
          <div>
            <p style={style.invoicePara}>{invoiceData?.payment_term.name}</p>
            <p style={style.invoicePara}>{invoiceData?.payment_mode.name}</p>
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
                <td className="border-b px-4 py-2">
                  {item.cost * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <div>
          <p style={style.invoiceMain}>Estimated Completion By: </p>
          <p style={style.invoicePara}>
            {invoiceData?.estimated_completion_date}
          </p>
        </div>
        <div className="flex justify-end">
          <div className="flex flex-col items-end">
            <p style={style.invoiceMain}>Sub Total: </p>
            <p style={style.invoiceMain}>GST: </p>
            <p style={style.invoiceMain}>Total: </p>
            <p style={style.invoiceMain}>Paid: </p>
            <p style={style.invoiceMain}>Due: </p>
          </div>
          <div>
            <p style={style.invoicePara}>{invoiceData?.total_amount * 0.82}</p>
            <p style={style.invoicePara}>18%</p>
            <p style={style.invoicePara}>{invoiceData?.total_amount}</p>
            <p style={style.invoicePara}>{invoiceData?.amount_paid}</p>
            <p style={style.invoicePara}>{invoiceData?.due}</p>
          </div>
        </div>
      </div>
      <div>
        <p style={style.invoiceMain}>Banking Details:</p>
        <p style={style.invoiceMain}>Account Number:</p>
        <p style={style.invoiceMain}>Bank:</p>
        <p style={style.invoiceMain}>IFSC:</p>
      </div>
    </div>
  );
}

export default Invoice;
