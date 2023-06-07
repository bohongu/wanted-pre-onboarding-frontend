import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../apis/api";

function Signup() {
  const navigate = useNavigate();
  const { email, password, disabled, onEmailChange, onPasswordChange } =
    useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await api.post("/auth/signup", { email, password });

      if (data.status === 201) {
        navigate("/signin");
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
          name="email"
          value={email}
          onChange={onEmailChange}
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={password}
          onChange={onPasswordChange}
        />
        <button data-testid="signup-button" disabled={disabled}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
