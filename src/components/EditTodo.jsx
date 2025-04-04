import React, { useState } from "react";
import { createPortal } from "react-dom";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [isOpen, setIsOpen] = useState(false);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      setIsOpen(false);
      window.location = "/";
    } catch (err) {
      console.error("Edit error:", err.message);
    }
  };

  const modalContent = (
    <div className="custom-modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h4>Edit Todo</h4>
          <button
            className="custom-modal-close"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="custom-modal-body">
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="custom-modal-footer">
          <button
            className="cta-btn cta-btn--purple"
            onClick={updateDescription}
          >
            Save
          </button>
          <button
            className="cta-btn cta-btn--hero"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <a>
      <button
        className="cta-btn cta-btn--purple"
        onClick={() => setIsOpen(true)}
      >
        Edit
      </button>
      {isOpen && createPortal(modalContent, document.body)}
    </a>
  );
};

export default EditTodo;
