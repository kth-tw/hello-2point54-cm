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
    <div>
      Your address is: {address} <br />
      You have {balance?.toString()} {process.env.TOKEN_NAME} on {process.env.CHAIN_NAME}.
    </div>
  );
}
