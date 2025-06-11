export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 버퍼 직접 파싱 (Vercel은 기본적으로 raw body 받음)
    const rawBody = await getRawBody(req);
    const formData = new URLSearchParams(rawBody.toString());

    const fetchRes = await fetch('https://dut.igg.com/event/code?lang=kor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const result = await fetchRes.text();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ error: 'Server Error', detail: err.message });
  }
}

// bodyParser 끄기 (Vercel에서는 form-urlencoded 파싱 직접 해야 함)
export const config = {
  api: {
    bodyParser: false,
  },
};

// util: getRawBody
import getRawBody from 'raw-body';
