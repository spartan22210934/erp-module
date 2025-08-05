import React, { useEffect, useState } from "react";
import api from "../api";
import useAuth from "../auth/useAuth";
import MaterialForm from "./MaterialForm";

export default function Materials() {
  const [q, setQ] = useState("");
  const [materials, setMaterials] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();

  const fetchMaterials = async () => {
    const res = await api.get("/materials", { params: { q, page, limit: 10 } });
    setMaterials(res.data.data);
    setTotalPages(res.data.pages || 1);
  };

  useEffect(() => { fetchMaterials(); }, [q, page]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this material?")) return;
    await api.delete(`/materials/${id}`);
    fetchMaterials();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Materials</h2>

      <div>
        <input placeholder="Search..." value={q} onChange={e => { setQ(e.target.value); setPage(1); }} />
      </div>

      {user?.role && ( // show create form to Admin and Site Engineer
        <MaterialForm onSaved={fetchMaterials} />
      )}

      <table border="1" cellPadding="8" style={{ marginTop: 12 }}>
        <thead>
          <tr><th>Name</th><th>Category</th><th>Qty</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {materials.map(m => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.category}</td>
              <td>{m.quantity}</td>
              <td>{m.status}</td>
              <td>
                <button onClick={() => {/* open edit */}}>Edit</button>
                {user?.role === "admin" && <button onClick={() => handleDelete(m._id)}>Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage(p => Math.max(1, p-1))}>Prev</button>
        <span> Page {page} / {totalPages} </span>
        <button onClick={() => setPage(p => Math.min(totalPages, p+1))}>Next</button>
      </div>
    </div>
  );
}
