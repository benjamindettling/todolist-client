import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ onTodoCountChange }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const notifyTodoCount = (newList) => {
    if (onTodoCountChange) {
      onTodoCountChange(newList.length);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/todos/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete todo");

      const updatedTodos = todos.filter((todo) => todo.todo_id !== id);
      setTodos(updatedTodos);
      notifyTodoCount(updatedTodos); // ✅ update the input field
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const getTodos = async () => {
    try {
      // await new Promise((res) => setTimeout(res, 3000)); // simulate delay
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/todos`
      );
      const jsonData = await response.json();
      setTodos(jsonData);
      notifyTodoCount(jsonData); // ✅ call once loaded
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section id="listtodos-section">
      <div className="container">
        <div className="todo-wrapper">
          {loading ? (
            <div className="spinner">
              <div className="loader"></div>
              <p className="text-center text-color-light mt-3">
                Loading list...
              </p>
            </div>
          ) : (
            <>
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
                  <div className="todo-card" key={todo.todo_id}>
                    <div className="row align-items-center">
                      <div className="col-md-6 col-sm-6">
                        <p className="text-color-light mb-0">
                          {todo.description}
                        </p>
                      </div>

                      <div className="col-md-3 col-sm-3 text-md-center mt-sm-2 mt-md-0">
                        <EditTodo todo={todo} />
                      </div>

                      <div className="col-md-3 col-sm-3 text-md-center mt-sm-2 mt-md-0">
                        <a>
                          <button
                            className="cta-btn cta-btn--red"
                            onClick={() => deleteTodo(todo.todo_id)}
                          >
                            Delete
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListTodos;
