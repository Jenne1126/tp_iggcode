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
        const res = await axios.post(
          "https://dut.igg.com/event/cdkey_ajax.php",
          {
            iggID: id,
            cdkey: code,
            lang: "kor",
            gameCode: "tp",
          }
        );

        // 메시지 출력
        if (res.data?.ret?.code === 0) {
          newResults.push(`${id}: ✅ 성공 - ${res.data.ret.msg}`);
        } else {
          newResults.push(`${id}: ❌ 실패 - ${res.data.ret?.msg || "알 수 없는 오류"}`);
        }
      } catch (err) {
        // 서버가 메시지를 보내준 경우
        const serverMsg = err.response?.data?.ret?.msg;
        if (serverMsg) {
          newResults.push(`${id}: ❌ 실패 - ${serverMsg}`);
        } else {
          newResults.push(`${id}: ⚠️ 네트워크 오류 (${err.message})`);
        }
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
