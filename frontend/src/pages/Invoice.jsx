import React from "react";
import api from "../api.js";

export default function Invoice() {
  const download = async () => {
    // Example: server expects invoice data in body or invoice id via GET
    try {
      // If using POST to generate and return PDF:
      const invoiceData = { id: "INV-001", items: [{ desc: "Item", qty: 1, price: 100 }] };
      const res = await api.post("/invoices/generate", invoiceData, {
        responseType: "blob"
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download invoice");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Invoice</h2>
      <button onClick={download}>Download Sample Invoice PDF</button>
    </div>
  );
}
