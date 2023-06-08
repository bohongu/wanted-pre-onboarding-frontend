import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../apis/authApi";

function Todo() {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTodo, setEditTodo] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    getTodos();
  }, []);

  const onChange = (event) => {
    setNewTodo(event.target.value);
  };

  const onModifyChange = (event) => {
    setEditTodo(event.target.value);
  };

  const getTodos = async () => {
    try {
      const data = await authApi.get("/todos");
      if (data.status === 200) {
        setTodoList(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddTodo = async (event) => {
    try {
      const data = await authApi.post(
        "/todos",
        { todo: newTodo },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.status === 201) {
        getTodos();
        setNewTodo("");
      }
    } catch (error) {
      console.error(error);
    }
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

  const onDeleteTodo = async (id) => {
    try {
      const data = await authApi.delete(`/todos/${id}`);
      if (data.status === 204) {
        getTodos();
      }
    } catch (error) {}
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
    <>
      <input
        type="text"
        data-testid="new-todo-input"
        value={newTodo}
        onChange={onChange}
      />
      <button data-testid="new-todo-add-button" onClick={onAddTodo}>
        추가
      </button>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() =>
                  onUpdateTodo(todo.id, todo.todo, !todo.isCompleted)
                }
              />
            </label>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTodo}
                  onChange={onModifyChange}
                  data-testid="modify-input"
                />
                <button
                  onClick={() => onSubmitEdit(todo.id, todo.isCompleted)}
                  data-testid="submit-button"
                >
                  제출
                </button>
                <button
                  onClick={() => downEditMode()}
                  data-testid="cancel-button"
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <span>{todo.todo}</span>
                <button
                  data-testid="modify-button"
                  onClick={() => {
                    editMode(todo.id, todo.todo);
                  }}
                >
                  수정
                </button>
                <button
                  data-testid="delete-button"
                  onClick={() => onDeleteTodo(todo.id)}
                >
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo;
