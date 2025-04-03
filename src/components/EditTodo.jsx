import React, { useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error("Edit error:", err.message);
    }
  };

  return (
    <>
      <a>
        <button
          type="button"
          className="cta-btn cta-btn--hero"
          data-toggle="modal"
          data-target={`#id${todo.todo_id}`}
        >
          Edit
        </button>
      </a>

      <div
        className="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <a>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={() => setDescription(todo.description)}
                >
                  &times;
                </button>
              </a>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <a>
                <button
                  type="button"
                  className="cta-btn cta-btn--hero"
                  data-dismiss="modal"
                  onClick={updateDescription}
                >
                  Edit
                </button>
              </a>
              <a>
                <button
                  type="button"
                  className="cta-btn cta-btn--hero"
                  data-dismiss="modal"
                  onClick={() => setDescription(todo.description)}
                >
                  Close
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
