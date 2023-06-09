import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../apis/api";

function TodoForm({ getTodos }) {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");

  const onChange = (event) => {
    setNewTodo(event.target.value);
  };

  const onLogOut = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const onAddTodo = async (event) => {
    if (!newTodo) {
      return;
    }
    try {
      const data = await api.post("/todos", { todo: newTodo });
      if (data.status === 201) {
        getTodos();
        setNewTodo("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form>
      <Top>
        <LogOut onClick={onLogOut}>로그아웃</LogOut>
      </Top>
      <Input
        type="text"
        data-testid="new-todo-input"
        value={newTodo}
        onChange={onChange}
      />
      <Button data-testid="new-todo-add-button" onClick={onAddTodo}>
        추가
      </Button>
    </Form>
  );
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 15px;
`;

const LogOut = styled.span`
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const Input = styled.input`
  width: 15rem;
  height: 2.5rem;
  margin-bottom: 5px;
`;

const Button = styled.button`
  cursor: pointer;
  height: 2.5rem;
  background: #a5d8ff;
  border: none;
  width: 15rem;

  &:hover {
    background: #74c0fc;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default TodoForm;
