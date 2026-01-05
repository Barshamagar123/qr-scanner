import { useState } from "react";
import api from "../utils/api";

export default function CreateUser({ onUserCreated }) {
  const [form, setForm] = useState({
    name: "",
    blood: "",
    phone: "",
    role: "EMERGENCY",
  });

  const handleSubmit = async () => {
    try {
      const res = await api.post("/users", form);
      const createdUser = res.data;

      // Save user to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(createdUser));

      // Notify parent
      onUserCreated(createdUser);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create user");
    }
  };

  return (
    <div className="p-4 border rounded flex flex-col gap-2">
      {["name", "blood", "phone"].map((f) => (
        <input
          key={f}
          placeholder={f}
          className="border p-2"
          value={form[f]}
          onChange={(e) => setForm({ ...form, [f]: e.target.value })}
        />
      ))}
      <select
        className="border p-2"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="EMERGENCY">EMERGENCY</option>
        <option value="FULL">FULL</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create User
      </button>
    </div>
  );
}
