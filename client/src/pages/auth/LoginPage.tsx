import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

      const response =
        await loginUser(
          email,
          password
        );

      localStorage.setItem(
        "token",
        response.token
      );

      navigate("/dashboard")

    } catch {

      alert("Login Failed");

    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900">

      <div className="bg-zinc-800 p-6 rounded-xl w-96">

        <h1 className="text-white text-2xl mb-4">
          Login
        </h1>

        <input
          className="w-full mb-3 p-2 rounded"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full mb-3 p-2 rounded"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          Login
        </button>

      </div>

    </div>
  );
};

export default LoginPage;