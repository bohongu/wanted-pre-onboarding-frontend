import React, { useState } from "react";
import authApi from "../apis/authApi";
import styled from "styled-components";

function TodoItems({ getTodos, todo }) {
  const [editId, setEditId] = useState(null);
  const [editTodo, setEditTodo] = useState("");

  const onModifyChange = (event) => {
    setEditTodo(event.target.value);
  };

  const onDeleteTodo = async (id) => {
    try {
      const data = await authApi.delete(`/todos/${id}`);
      if (data.status === 204) {
        getTodos();
      }
    } catch (error) {}
  };

  const onUpdateTodo = async (id, todo, isCompleted) => {
    try {
      const data = await authApi.put(
        `/todos/${id}`,
        {
          todo,
          isCompleted,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === 200) {
        getTodos();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editMode = (id, todo) => {
    setEditId(id);
    setEditTodo(todo);
  };

  const downEditMode = () => {
    setEditId(null);
    setEditTodo("");
  };

  const onSubmitEdit = (id, isCompleted) => {
    onUpdateTodo(id, editTodo, isCompleted);
    downEditMode();
  };

  return (
    <TodoItem>
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onUpdateTodo(todo.id, todo.todo, !todo.isCompleted)}
        />
      </label>
      {editId === todo.id ? (
        <>
          <EditInput
            type="text"
            value={editTodo}
            onChange={onModifyChange}
            data-testid="modify-input"
          />
          <TodoButton
            onClick={() => onSubmitEdit(todo.id, todo.isCompleted)}
            data-testid="submit-button"
          >
            제출
          </TodoButton>
          <TodoButton
            onClick={() => downEditMode()}
            data-testid="cancel-button"
          >
            취소
          </TodoButton>
        </>
      ) : (
        <>
          <TodoText>{todo.todo}</TodoText>
          <Buttons>
            <TodoButton
              data-testid="modify-button"
              onClick={() => {
                editMode(todo.id, todo.todo);
              }}
            >
              수정
            </TodoButton>
            <TodoButton
              data-testid="delete-button"
              onClick={() => onDeleteTodo(todo.id)}
            >
              삭제
            </TodoButton>
          </Buttons>
        </>
      )}
    </TodoItem>
  );
}

const TodoItem = styled.li`
  height: 2.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const EditInput = styled.input`
  height: 100%;
  width: 80%;
`;

const TodoButton = styled.button`
  cursor: pointer;
  background: #a5d8ff;
  border: none;
  &:hover {
    background: #74c0fc;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  height: 2.5rem;
  width: 3rem;
  margin-right: 4px;
`;

const Buttons = styled.div`
  display: flex;
`;

const TodoText = styled.div`
  margin-left: 8px;
  width: 80%;
`;

export default TodoItems;
