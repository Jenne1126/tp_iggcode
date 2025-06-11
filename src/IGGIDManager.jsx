import React, { useState } from "react";

function IGGIDManager({ iggIds, setIggIds }) {
  const [newId, setNewId] = useState("");

  const addId = () => {
    if (newId && !iggIds.includes(newId)) {
      setIggIds([...iggIds, newId]);
      setNewId("");
    }
  };

  const removeId = (id) => {
    setIggIds(iggIds.filter((i) => i !== id));
  };

  return (
    <div style={{ width: "100%", maxWidth: "50vw" }}>
      <h3>📑 IGG ID 목록</h3>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
          placeholder="IGG ID 입력"
          style={{ flex: 1, padding: "8px" }}
        />
        <button
          onClick={addId}
          style={{
            padding: "8px 12px",
            fontSize: "14px",
            backgroundColor: "#9c27b0",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ➕ 추가
        </button>
      </div>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {iggIds.map((id) => (
          <li key={id} style={{ marginBottom: "0.5rem" }}>
            • {id}{" "}
            <button
              onClick={() => removeId(id)}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "4px 8px",
                marginLeft: "8px",
                cursor: "pointer",
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IGGIDManager;
