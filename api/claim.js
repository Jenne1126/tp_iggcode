// api/claim.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const formData = new URLSearchParams()
    for (const key in req.body) {
        formData.append(key,req.body[key])
    }

    const fetchRes = await fetch('https://dut.igg.com/event/cdkey_ajax.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    })

    const result = await fetchRes.text()
    res.status(200).send(result)
  } catch (err) {
    res.status(500).json({ error: 'Server Error', detail: err.message })
  }
}
