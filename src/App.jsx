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
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>🎁 타임 프린세스 쿠폰 일괄 수령기</h2>
      <CodeClaimer iggIds={iggIds} />
      <IGGIDManager iggIds={iggIds} setIggIds={updateIggIds} />      
    </div>
  );
}