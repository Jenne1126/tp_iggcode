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
    <div style={{ marginBottom: "2rem" }}>
      <h3>🧾 IGG ID 목록</h3>
      <input
        value={newId}
        onChange={(e) => setNewId(e.target.value)}
        placeholder="IGG ID 입력"
        style={{ padding: "8px", width: "200px", marginRight: "8px" }}
      />
      <button
        onClick={addId}
        style={{
          padding: "6px 12px",
          fontSize: "14px",
          cursor: "pointer",
          // backgroundColor: "#2196F3",
          color: "black",
          border: "none",
          borderRadius: "4px",
        }}
      >
        ➕ 추가
      </button>

      <ul style={{ marginTop: "1rem", paddingLeft: "20px" }}>
        {iggIds.map((id) => (
          <li key={id} style={{ marginBottom: "6px" }}>
            {id}{" "}
            <button
              onClick={() => removeId(id)}
              style={{
                padding: "4px 10px",
                fontSize: "13px",
                cursor: "pointer",
                backgroundColor: "#f44336", // 빨간색
                color: "white",
                border: "none",
                borderRadius: "4px",
                marginLeft: "8px",
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
