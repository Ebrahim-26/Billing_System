"use client";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Document,
  Page,
  Image,
  PDFViewer,
  BlobProvider,
} from "@react-pdf/renderer";
import axios from "axios";
import { useParams } from "next/navigation";
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    backgroundColor: "#1010",
    height: "100vh",
    width: "100vw",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    width: 65,
    height: 66,
  },
  title: {
    fontSize: 16,
    fontWeight: "extrabold",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
    padding: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  totalLabel: {
    fontWeight: "bold",
    marginRight: 10,
  },
  totalText: {
    display: "flex",
    justifyContent: "flex-end",
  },
  totalValue: {
    display: "flex",
    justifyContent: "flex-start",
  },
});

// Define the Invoice Component
function DownloadInvoice() {
  const [invoiceData, setInvoiceData] = useState(null);
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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [invoiceID]);

  // PDF Document
  const InvoicePDF = () => (
    <Document>
      <Page style={styles.page}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image
            src="/logo/tarvizLogo.png" 
            style={{ width: 50 }} 
          />{" "}
          <Image
            src="/logo/tarvizLogo.png" 
            style={{
              position: "absolute",
              top: "70%", 
              left: "25%", 
              transform: "translate(-50%, -50%)", 
              width: "50%", 
              height: "auto",
              opacity: 0.03, 
              zIndex: -1,
            }} 
          />{" "}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Text style={styles.title}>INVOICE</Text>
            <Text>Invoice Number: {invoiceData?.number}</Text>
            <Text>Date: {invoiceData?.date}</Text>
          </View>
        </View>
        <View>
          <View>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Tarviz DigiMart
            </Text>
            <Text style={{ marginBottom: "2px" }}>Nungambakkam, Chennai</Text>
            <Text>+91 9876543210</Text>
          </View>
        </View>

        {/* Bill To Section */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginTop: "10px" }}>
            <Text style={styles.title}>Bill To:</Text>
            <Text>{invoiceData?.client?.name}</Text>
            <Text>{invoiceData?.client?.address?.line1}</Text>
            <Text>{invoiceData?.client?.address?.city}</Text>
            <Text>Email: {invoiceData?.client?.email}</Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <View>
              <Text>Payment Term:</Text>
              <Text>Payment Mode:</Text>
            </View>
            <View>
              <Text>{invoiceData?.payment_term.name}</Text>
              <Text>{invoiceData?.payment_mode.name}</Text>
            </View>
          </View>
        </View>

        {/* Table Section */}
        <View
          style={{
            display: "table",
            width: "100%",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#e0e0e0",
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>#</Text>
            <Text style={styles.tableCell}>Services</Text>
            <Text style={styles.tableCell}>Qty</Text>
            <Text style={styles.tableCell}>Rate</Text>
            <Text style={styles.tableCell}>Amount</Text>
          </View>
          {invoiceData?.services?.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{item.service_name}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>{item.cost}</Text>
              <Text style={styles.tableCell}>{item.cost * item.quantity}</Text>
            </View>
          ))}
        </View>

        {/* Total Section */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{fontSize:17}}>Estimated Completion By: </Text>
            <Text>{invoiceData?.estimated_completion_date}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                fontWeight: "bold",
              }}
            >
              <Text>
                Sub Total: {invoiceData?.total_amount * 0.82} </Text>
              <Text>GST: 18% </Text>
              <Text>Total:{invoiceData?.total_amount} </Text>
              <Text>Paid:{invoiceData?.amount_paid} </Text>
              <Text
                style={{
                  fontSize: "16px",
                  padding: "5px",
                  backgroundColor:'#f20815',
                  fontWeight: 'bold',
                  borderRadius:'2px',
                }}
              >
                Due:  {invoiceData?.due}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{ display: "flex", justifyContent: "flex-end", height: "50%" }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "col",
                }}
              >
                <Text
                 style={{fontWeight: "bold"}}
                >
                  Bank Details
                </Text>
                <Text>Account Number: 783456987</Text>
                <Text>Bank:SBI</Text>
                <Text>IFSC:SBI001</Text>
              </View>
            </View>
            <View>
              <Image src="/logo/sign.png" style={{ width: 50 }} />
              <Text>Authorizer Signature</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="h-2 mt-2">
      <BlobProvider document={<InvoicePDF />}>
        {({ url }) => (
          <a
            className="font-bold"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
        )}
      </BlobProvider>
    </div>
  );
}

export default DownloadInvoice;
