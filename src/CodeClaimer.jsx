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

  // ✅ [-숫자] 제거
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
  <div
    style={{
      maxWidth: "600px",        // 최대 폭 제한
      minWidth: "320px",        // 모바일 기준 최소 폭
      margin: "2rem auto",      // 중앙 정렬
      padding: "1.5rem",        // 안쪽 여백
      fontSize: "1.1rem",       // 전체 글자 살짝 키움
      width: "90%",             // 모바일에서 꽉 차게
      boxSizing: "border-box",  // 패딩 포함
      backgroundColor: "#fff",  // 흰 배경 (선택)
      borderRadius: "8px",      // 살짝 둥글게 (선택)
      boxShadow: "0 0 8px rgba(0,0,0,0.05)", // 살짝 그림자 (선택)
    }}
  >
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
