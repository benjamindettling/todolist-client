import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/todos/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete todo");
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/todos`
      );
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section id="todos">
      <div className="container">
        <div className="todo-wrapper">
          <h2 className="section-title dark-blue-text">Your Todos</h2>

          {/* Column headers */}
          <div className="row fw-bold mb-3">
            <div className="col-md-6 col-sm-6 todo-wrapper__text-title">
              Description
            </div>
            <div className="col-md-3 col-sm-3 text-md-center todo-wrapper__text-title">
              Edit
            </div>
            <div className="col-md-3 col-sm-3 text-md-center todo-wrapper__text-title">
              Delete
            </div>
          </div>

          {/* Todo items */}
          <div className="todo-list">
            {todos.map((todo) => (
              <div className="row align-items-center mb-3" key={todo.todo_id}>
                <div className="col-md-6 col-sm-6">
                  <p className="text-color-light mb-0">{todo.description}</p>
                </div>

                <div className="col-md-3 col-sm-3 text-md-center mt-sm-2 mt-md-0">
                  <EditTodo todo={todo} />
                </div>

                <div className="col-md-3 col-sm-3 text-md-center mt-sm-2 mt-md-0">
                  <a>
                    <button
                      className="cta-btn cta-btn--hero"
                      onClick={() => deleteTodo(todo.todo_id)}
                    >
                      Delete
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListTodos;
