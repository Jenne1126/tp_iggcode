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
        formData.append("action", "claim_cdkey");
        formData.append("cdkey", code);
        formData.append("iggid", id);
        formData.append("lang", "ko");

        const res = await axios.post("/api/claim", formData.toString(), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const text = res.data;

        if (text.includes("이미 수령하셨습니다")) {
          newResults.push(`${id}: ⚠️ 이미 수령된 코드`);
        } else if (text.includes("성공적으로 수령하셨습니다")) {
          newResults.push(`${id}: ✅ 성공`);
        } else if (text.includes("올바르지 않은 IGGID")) {
          newResults.push(`${id}: ❌ IGG ID 오류`);
        } else if (text.includes("존재하지 않는 코드")) {
          newResults.push(`${id}: ❌ 유효하지 않은 코드`);
        } else {
          newResults.push(`${id}: ❓ 기타 - ${text}`);
        }
      } catch (err) {
        newResults.push(`${id}: ⚠️ 네트워크 오류 (${err.message})`);
      }
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>🎫 쿠폰 코드 입력</h3>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="쿠폰 코드 입력"
        style={{ padding: "8px", width: "200px", marginRight: "8px" }}
      />
      <button
        onClick={claimCode}
        disabled={loading}
        style={{
          padding: "6px 12px",
          fontSize: "14px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        {loading ? "수령 중..." : "전체 수령"}
      </button>

      <div style={{ marginTop: "1rem" }}>
        {results.map((result, index) => (
          <div key={index}>{result}</div>
        ))}
      </div>
    </div>
  );
}

export default CodeClaimer;
