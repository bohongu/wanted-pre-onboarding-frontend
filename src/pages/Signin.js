import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../apis/api";
import { Bottom, Button, Div, Form, Input, Title, Wrapper } from "./Signup";

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
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Title>로그인</Title>
        <Input
          type="email"
          data-testid="email-input"
          value={email}
          onChange={onEmailChange}
          placeholder="Email"
        />
        <Input
          type="password"
          data-testid="password-input"
          value={password}
          onChange={onPasswordChange}
          placeholder="Password"
        />
        <Button data-testid="signin-button" disabled={disabled}>
          로그인
        </Button>
        <Bottom>
          <Div onClick={() => navigate("/signup")}>회원가입 하러가기</Div>
        </Bottom>
      </Form>
    </Wrapper>
  );
}

export default Signin;
