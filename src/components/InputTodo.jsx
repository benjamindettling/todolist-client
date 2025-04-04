import React, { useState, useEffect } from "react";

const InputTodo = ({ todoCount }) => {
  const [description, setDescription] = useState("");
  const todoLimitReached = todoCount >= 5;

  useEffect(() => {
    const checkLimit = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/todos`
        );
        const todos = await response.json();
        setTodoLimitReached(todos.length >= 5);
      } catch (err) {
        console.error("Error checking todo limit:", err.message);
      }
    };

    checkLimit();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { description };
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/todos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      await response.json();
      window.location = "/";
    } catch (err) {
      console.error("Error submitting todo:", err.message);
    }
  };

  return (
    <section id="add-todo">
      <div className="container">
        <h1 className="section-title dark-blue-text">PERN Todo List</h1>
        <form
          className="todo-form d-flex justify-content-center align-items-center gap-2"
          onSubmit={onSubmitForm}
        >
          <input
            type="text"
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a new task"
            disabled={todoLimitReached}
          />
          <a>
            <button
              className="cta-btn cta-btn--hero"
              type="submit"
              disabled={todoLimitReached}
            >
              Add
            </button>
          </a>
        </form>

        {todoLimitReached && (
          <p className="text-center text-color-light mt-3">
            🚫 Maximum todos reached. Please delete one before adding a new
            task.
          </p>
        )}
      </div>
    </section>
  );
};

export default InputTodo;
