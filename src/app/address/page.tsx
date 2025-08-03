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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2.5rem 2rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          minWidth: "320px",
        }}
      >
        <label
          style={{
            fontWeight: 600,
            fontSize: "1.1rem",
            color: "#333",
          }}
        >
          Address：
          <input
            type="text"
            name="address"
            required
            placeholder="請輸入地址"
            style={{
              marginTop: "0.5rem",
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #cfd8dc",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#90caf9")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#cfd8dc")}
          />
        </label>
        <button
          type="submit"
          style={{
            background:
              "linear-gradient(90deg, #42a5f5 0%, #478ed1 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.75rem",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(66,165,245,0.08)",
            transition: "background 0.2s",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
