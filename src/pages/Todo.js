import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodoForm from "../components/TodoForm";
import TodoLists from "../components/TodoLists";
import api from "../apis/api";

function Todo() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodos();
    } else {
      window.location.reload();
    }
  }, []);

  const getTodos = async () => {
    try {
      const data = await api.get("/todos");
      if (data.status === 200) {
        setTodoList(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Title>TODO</Title>
      <TodoForm getTodos={getTodos} />
      <TodoLists getTodos={getTodos} todoList={todoList} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-decoration: underline;
`;

export default Todo;
