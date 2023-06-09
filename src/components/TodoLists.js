import React from "react";
import styled from "styled-components";
import TodoItems from "./TodoItems";

function TodoLists({ getTodos, todoList }) {
  return (
    <TodoList>
      {todoList.map((todo) => (
        <TodoItems key={todo.id} todo={todo} getTodos={getTodos} />
      ))}
    </TodoList>
  );
}

const TodoList = styled.ul`
  width: 30rem;
  list-style-type: none;
`;

export default TodoLists;
