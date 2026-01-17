import { useState } from "react";

export default function MyContact() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔥 HARD PROOF (CAN'T FAIL)
    alert("Form submitted");

    setSuccess(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "20px",
          border: "2px solid white",
        }}
      >
        <h1>My Contact</h1>

        {/* 🔥 TEXT THAT MUST SHOW */}
        {success && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "green",
              color: "white",
            }}
          >
            ✅ Email sent successfully
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            style={{ width: "100%", marginTop: "10px" }}
          />
          <input
            placeholder="Email"
            style={{ width: "100%", marginTop: "10px" }}
          />
          <textarea
            placeholder="Message"
            style={{ width: "100%", marginTop: "10px" }}
          />

          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "10px",
              width: "100%",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
