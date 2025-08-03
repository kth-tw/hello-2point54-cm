

export default async function Page(props: { params: Promise<{ address: string }> }) {
  const params = await props.params;
  const address = params.address;


  return (
    <div>
      Your address is: {address}
    </div>
  );
}
