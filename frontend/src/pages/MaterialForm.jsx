import React, { useState } from "react";
import api from "../api";

export default function MaterialForm({ onSaved }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/materials", { name, category, quantity });
      setName(""); setCategory(""); setQuantity(0);
      onSaved?.();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving");
    }
  };

  return (
    <form onSubmit={submit} style={{ marginTop: 12 }}>
      <h4>Create material</h4>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
      <input value={quantity} onChange={e => setQuantity(Number(e.target.value))} type="number" placeholder="Quantity" />
      <button type="submit">Save</button>
    </form>
  );
}
