import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const BASE_URL = "https://www.pre-onboarding-selection-task.shop";

function Signup() {
  const navigate = useNavigate();
  const { email, password, disabled, onEmailChange, onPasswordChange } =
    useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { status } = await axios.post(
        `${BASE_URL}/auth/signup`,
        {
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (status === 201) {
        navigate("/signin");
      } else {
        alert("회원가입이 실패하였습니다.");
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
