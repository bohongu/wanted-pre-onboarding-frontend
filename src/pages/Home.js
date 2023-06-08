import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Home() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>원티드 프리온보딩 프론트엔드 - 선발과제</Title>
      <Button onClick={() => navigate("/signin")}>로그인 하러가기</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 4rem;
`;

const Button = styled.div`
  padding: 3px;
  border-radius: 3px;
  cursor: pointer;
  border: 1px solid black;

  &:hover {
    border: 1px solid #73c0fc;
    background: #73c0fc;
    color: #ffffff;
  }
`;

export default Home;
