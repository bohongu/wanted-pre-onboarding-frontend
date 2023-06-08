import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../apis/api";
import styled from "styled-components";

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
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Title>회원가입</Title>
        <Input
          type="email"
          data-testid="email-input"
          value={email}
          onChange={onEmailChange}
        />
        <Input
          type="password"
          data-testid="password-input"
          value={password}
          onChange={onPasswordChange}
        />
        <Button data-testid="signup-button" disabled={disabled}>
          회원가입
        </Button>
      </Form>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 16rem;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

export const Title = styled.h1`
  font-size: 14px;
`;

export const Input = styled.input`
  height: 2.5rem;
  padding: 5px;
  font-size: 20px;
  width: 100%;
`;

export const Button = styled.button`
  cursor: pointer;
  height: 2.5rem;
  background: #a5d8ff;
  border: none;
  width: 100%;

  &:hover {
    background: #74c0fc;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default Signup;
