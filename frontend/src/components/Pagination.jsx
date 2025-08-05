import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        style={{
          margin: "0 5px",
          backgroundColor: i === currentPage ? "#333" : "#eee",
          color: i === currentPage ? "#fff" : "#000",
          border: "1px solid #ccc",
          padding: "5px 10px",
          cursor: "pointer"
        }}
      >
        {i}
      </button>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
