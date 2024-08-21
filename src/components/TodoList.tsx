import React, { useState } from "react";
import { Todo } from "../types/todo";
import TodoCard from "./TodoCard";
import useTodoStore from "../store/todoStore";

type TodoListProps = {
  todos: Todo[];
  filter: string;
  searchQuery: string;
};

const TodoList: React.FC<TodoListProps> = ({ todos, filter, searchQuery }) => {
  const { editTodo } = useTodoStore(state => ({
    editTodo: state.editTodo,
  }));

  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");

  const filteredTodos = todos
    .filter(todo => {
      if (filter === "Completed") return todo.completed;
      if (filter === "Incomplete") return !todo.completed;
      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (filter === "Alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const handleEditClick = (todo: Todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
    if (editId !== null) {
      editTodo(editId, { title: e.target.value });
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditDescription(e.target.value);
    if (editId !== null) {
      editTodo(editId, { description: e.target.value });
    }
  };

  const { theme } = useTodoStore(state => ({
    theme: state.theme,
  }));

  return (
    <div className="px-20">
      {sortedTodos.length === 0 ? (
        <div className="grid justify-center text-center text-gray-500 mt-10">
          <img
            src={
              theme === "dark"
                ? "/illustrations/empty-data-dark.svg"
                : "/illustrations/empty-data.svg"
            }
            alt="Empty Data"
            className="mb-4"
          />
          <p
            className={`text-[20px] font-normal ${
              theme === "dark" ? "text-white" : "text-customBlack"
            }`}
          >
            Empty...
          </p>
        </div>
      ) : (
        sortedTodos.map(todo => (
          <TodoCard
            key={todo.id}
            todo={todo}
            isEditing={editId === todo.id}
            editTitle={editTitle}
            editDescription={editDescription}
            onEditClick={handleEditClick}
            onCancelEdit={handleCancelEdit}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
