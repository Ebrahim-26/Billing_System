"use client";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Document,
  Page,
  PDFViewer,
  BlobProvider,
} from "@react-pdf/renderer";
import axios from "axios";
import { useParams } from "next/navigation";
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    backgroundColor: "#ffffff",
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
          `http://localhost:8000/api/invoices/${invoiceID}/`,
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
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title} className="font-extrabold">
              Tarviz DigiMart
            </Text>
            <Text>Nungambakkam, Chennai</Text>
            <Text>+91 9876543210</Text>
          </View>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text>Invoice Number: {invoiceData?.number}</Text>
            <Text>Date: {invoiceData?.date}</Text>
          </View>
        </View>

        {/* Bill To Section */}
        <View style={styles.section}>
          <Text style={styles.title} className="bg-purple-500">
            Bill To:
          </Text>
          <Text>{invoiceData?.client?.name}</Text>
          <Text>{invoiceData?.client?.address?.line1}</Text>
          <Text>{invoiceData?.client?.address?.city}</Text>
          <Text>Email: {invoiceData?.client?.email}</Text>
        </View>

        {/* Table Section */}
        <View style={styles.table}>
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
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Sub Total:</Text>
          <Text>{invoiceData?.total_amount * 0.82}</Text>
        </View>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>GST:</Text>
          <Text>18%</Text>
        </View>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text>{invoiceData?.total_amount}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="h-2 mt-2">
      <BlobProvider document={<InvoicePDF />}>
        {({ url }) => (
          <a className="font-bold" href={url} target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        )}
      </BlobProvider>
    </div>
  );
}

export default DownloadInvoice;
