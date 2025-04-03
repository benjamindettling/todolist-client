import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  // edit description function
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
    } catch (err) {
      console.error("Edit error:", err.message);
    }
  };

  return (
    <Fragment>
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
                  onClick={(e) => updateDescription(e)}
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
    </Fragment>
  );
};

export default EditTodo;
