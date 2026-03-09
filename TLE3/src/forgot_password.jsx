import React, { useState } from "react";


function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const payload = { email: formData.get("email") };

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Versturen mislukt.");
      setSuccess("Reset-link is verstuurd.");
      e.currentTarget.reset();
    } catch (err) {
      setError(err.message || "Er ging iets mis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-xl font-semibold mb-4 text-center">Wachtwoord vergeten</h1>

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          title="Vul een geldig emailadres in"
          placeholder="Vul hier je email in"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Bezig..." : "Verstuur reset-link"}
        </button>

        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-3">{success}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
