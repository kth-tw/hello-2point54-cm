export default async function Page(props: { params: Promise<{ address: string }> }) {
  const params = await props.params;
  const address = params.address;

  // 呼叫 1inch API 取得餘額
  let balance: string | null = null;
  try {
    const res = await fetch(
      `https://api.1inch.dev/balance/v1.2/${process.env.CHAIN_ID}/balances/${address}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env['1INCH_API_KEY']}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokens: [process.env.TOKEN_ADDRESS] }),
        next: { revalidate: 60 }
      }
    );
    if (!res.ok) {
      throw new Error(`API 回應錯誤: ${res.status}`);
    }
    const result = await res.json()

    const balanceBigInt = BigInt(result[(process.env.TOKEN_ADDRESS!).toLowerCase()]);
    const decimal = BigInt(10) ** BigInt(process.env.TOKEN_DECIMAL!);
    balance = `${balanceBigInt / decimal}.${balanceBigInt % decimal}`;
  } catch (e) {
    console.error('Error fetching balance:', e);
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"
    }}>
      <div style={{
        background: "#fff",
        padding: "2.5rem 2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        minWidth: "340px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "1.1rem", color: "#666", marginBottom: "1.2rem" }}>
          <span style={{ fontWeight: 600, color: "#333" }}>Your address:</span>
          <br />
          <span style={{
            fontFamily: "monospace",
            background: "#f5f7fa",
            padding: "0.4rem 0.7rem",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            wordBreak: "break-all",
            display: "inline-block",
            marginTop: "0.5rem"
          }}>{address}</span>
        </div>
        <div style={{ fontSize: "1.15rem", color: "#333" }}>
          <span style={{ fontWeight: 600 }}>Balance:</span>
          <br />
          <span style={{
            fontSize: "1.5rem",
            color: "#1976d2",
            fontWeight: 700,
            letterSpacing: "0.5px"
          }}>
            {balance?.toString() ?? <span style={{ color: "#aaa" }}>無法取得</span>}
          </span>
          <span style={{ marginLeft: "0.5rem", color: "#666", fontWeight: 500 }}>
            {process.env.TOKEN_NAME}
          </span>
        </div>
        <div style={{ marginTop: "1.2rem", color: "#888", fontSize: "1rem" }}>
          on <span style={{ fontWeight: 600 }}>{process.env.CHAIN_NAME}</span>
        </div>
      </div>
    </div>
  );
}
