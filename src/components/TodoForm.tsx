import React, { useState } from "react";
import useTodoStore from "../store/todoStore";

type TodoFormProps = {
  onClose: () => void;
};

const TodoForm: React.FC<TodoFormProps> = ({ onClose }) => {
  const addTodo = useTodoStore(state => state.addTodo);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datetime] = useState(new Date().toISOString().slice(0, 16));

  const { theme } = useTodoStore(state => ({
    theme: state.theme,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({
      id: Date.now(),
      title,
      description,
      datetime,
      completed: false,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className={`block text-sm font-medium mb-1 ${
            theme === "dark" ? "text-white" : "text-customBlack"
          }`}
        >
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={`p-2 border rounded-md w-full placeholder-gray-500 focus:outline-none ${
            theme === "dark"
              ? "border-white text-white bg-customBlack"
              : "border-customPurple text-gray-900"
          }`}
          required
          placeholder="Input your note..."
        />
      </div>
      <div className="mb-4">
        <label
          className={`block text-sm font-medium mb-1 ${
            theme === "dark" ? "text-white" : "text-customBlack"
          }`}
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={`p-2 border rounded-md w-full placeholder-gray-500 focus:outline-none ${
            theme === "dark"
              ? "border-white text-white bg-customBlack"
              : "border-customPurple text-gray-900"
          }`}
          placeholder="Description..."
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="py-1 px-5 border-2 border-customPurple text-customPurple rounded uppercase"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-1 px-5 border-2 border-customPurple bg-customPurple text-gray-100 rounded uppercase"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
