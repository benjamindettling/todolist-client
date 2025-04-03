import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { description };
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/todos`,
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
    <Fragment>
      <h1 className="todo-title"></h1>
      <form className="todo-form" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a new task"
        />
        <a>
          <button className="cta-btn cta-btn--hero">Add</button>
        </a>
      </form>
    </Fragment>
  );
};

export default InputTodo;
