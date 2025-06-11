import React, { useState } from "react";
import CodeClaimer from "./CodeClaimer";
import IGGIDManager from "./IGGIDManager";

function App() {
  const [iggIds, setIggIds] = useState(() => {
    return JSON.parse(localStorage.getItem("iggIds") || "[]");
  });

  const updateIggIds = (ids) => {
    setIggIds(ids);
    localStorage.setItem("iggIds", JSON.stringify(ids));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "4rem",
        alignItems: "center",
        padding: "2rem",
        fontFamily: "Arial",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem" }}>🎁 타임 프린세스 쿠폰 일괄 수령기</h2>
      <CodeClaimer iggIds={iggIds} />
      <IGGIDManager iggIds={iggIds} setIggIds={updateIggIds} />
    </div>
  );
}

export default App;