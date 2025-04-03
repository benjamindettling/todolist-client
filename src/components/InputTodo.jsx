import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

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
          />
          <a>
            <button className="cta-btn cta-btn--hero" type="submit">
              Add
            </button>
          </a>
        </form>
      </div>
    </section>
  );
};

export default InputTodo;
