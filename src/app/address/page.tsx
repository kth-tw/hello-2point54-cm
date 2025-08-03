"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const address = formData.get("address");
    if (typeof address === "string" && address.trim()) {
      router.push(`address/${encodeURIComponent(address)}/info`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Address：
        <input type="text" name="address" required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
