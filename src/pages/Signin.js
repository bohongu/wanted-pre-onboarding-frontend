import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../apis/api";

function Signin() {
  const navigate = useNavigate();
  const { email, password, disabled, onEmailChange, onPasswordChange } =
    useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await api.post("/auth/signin", { email, password });

      if (data.status === 200) {
        localStorage.setItem("token", data.data.access_token);
        navigate("/todo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todo");
    }
  }, [navigate]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          data-testid="email-input"
          value={email}
          onChange={onEmailChange}
        />
        <input
          type="password"
          data-testid="password-input"
          value={password}
          onChange={onPasswordChange}
        />
        <button data-testid="signin-button" disabled={disabled}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default Signin;
