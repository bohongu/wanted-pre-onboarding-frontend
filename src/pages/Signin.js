import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://www.pre-onboarding-selection-task.shop/";

function Signin() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (event) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await axios.post(
        `${BASE_URL}auth/signin`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === 200) {
        console.log(data);
        localStorage.setItem("token", data.data.access_token);
        navigate("/todo");
      } else {
        alert("로그인을 실패하였습니다.");
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

  useEffect(() => {
    const isEmailValid = email.includes("@");
    const isPasswordValid = password.length >= 8;
    setDisabled(!(isEmailValid && isPasswordValid));
  }, [email, password]);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button data-testid="signin-button" disabled={disabled}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default Signin;
