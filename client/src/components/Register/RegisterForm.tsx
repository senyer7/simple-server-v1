import { useState } from "react";
import "./RegisterForm.css";

interface IFormData {
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (!formData.email || !formData.password) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    try {
      const res = await fetch(
        "https://simple-server-v1-production.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Успешная регистрация.");
      } else {
        alert(data.message || "Ошибка регистрации.");
      }
    } catch (error) {
      console.error("Ошибка регистрации: ", error);
      alert("Произошла ошибка при регистрации.");
    }
  };

  return (
    <div>
      <h1 className="title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          name="email"
          placeholder="ivanov@example.ru"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="мойсекретныйпароль123"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        <button type="submit" className="sign-up">
          зарегистрироваться
        </button>
      </form>
    </div>
  );
}
