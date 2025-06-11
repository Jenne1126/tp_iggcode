import React, { useState } from "react";
import axios from "axios";

function CodeClaimer({ iggIds }) {
  const [code, setCode] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const claimCode = async () => {
    if (!code) return alert("쿠폰 코드를 입력해주세요.");
    if (iggIds.length === 0) return alert("IGG ID를 추가해주세요.");

    setLoading(true);
    const newResults = [];

    for (let id of iggIds) {
      try {
        const formData = new URLSearchParams();
        formData.append("iggid", id);
        formData.append("cdkey", code);
        formData.append("username", "");
        formData.append("sign", "0");
        //formData.append("action", "claim_cdkey");
        //formData.append("lang", "kor");

        const response = await axios.post("/api/claim", formData.toString(), {
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  },
        });

        let text = response.data;
        
        if (typeof text !== "string") {
            text = JSON.stringify(text);
          }
        
        try {
  const parsed = JSON.parse(text);
  let msg = parsed.msg || "응답 메시지 없음";
  msg = msg.replace(/\[\-\d+\]/g, "").trim();

  if (msg.includes("이미 수령하셨습니다") || msg.includes("보상을 수령하였습니다")) {
    newResults.push(`${id}: ⚠️ ${msg}`);
  } else if (msg.includes("성공적으로 수령하셨습니다")) {
    newResults.push(`${id}: ✅ 성공`);
  } else if (msg.includes("올바르지 않은 IGGID")) {
    newResults.push(`${id}: ❌ IGG ID 오류`);
  } else if (msg.includes("존재하지 않는 코드")) {
    newResults.push(`${id}: ❌ 유효하지 않은 코드`);
  } else {
    newResults.push(`${id}: ❓ 기타 - ${msg}`);
  }
} catch (e) {
  newResults.push(`${id}: ❓ 기타 (파싱 실패) - ${text}`);
}
      } catch (err) {
        newResults.push(`${id}: ⚠️ 네트워크 오류 (${err.message})`);
      }
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div style={{ marginBottom: "2rem", width: "100%", maxWidth: "90vw" }}>
      <h3>💳 쿠폰 코드 입력</h3>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="쿠폰 코드 입력"
          style={{ padding: "8px", flex: 1 }}
        />
        <button
          onClick={claimCode}
          disabled={loading}
          style={{
            padding: "8px 12px",
            fontSize: "14px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {loading ? "수령 중..." : "전체 수령"}
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        {results.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div>
    </div>
  );
}

export default CodeClaimer;
