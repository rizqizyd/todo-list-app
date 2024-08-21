import { useState } from "react";

import "./App.css";

import Modal from "./components/Modal";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodoStore from "./store/todoStore";
import TodoFilter from "./components/TodoFilter";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { todos } = useTodoStore(state => ({ todos: state.todos }));

  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { theme } = useTodoStore(state => ({
    theme: state.theme,
  }));

  return (
    <div
      className={`App ${
        theme === "dark"
          ? "bg-customBlack text-white"
          : "bg-white text-customBlack"
      }`}
    >
      <div className="container mx-auto max-w-3xl h-screen relative py-5">
        <h1
          className={`text-[26px] font-semibold uppercase ${
            theme === "dark" ? "text-[#F7F7F7]" : "text-customBlack"
          }`}
        >
          Todo List
        </h1>
        <main className="p-4">
          <TodoFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filter={filter}
            setFilter={setFilter}
          />
          <div
            onClick={openModal}
            className="bg-customPurple rounded-full w-[50px] h-[50px] hover:cursor-pointer shadow-md p-4 flex items-center justify-center absolute bottom-7 right-5"
          >
            <img src="/icons/add-btn.svg" alt="Add To Do List" />
          </div>

          <TodoList todos={todos} searchQuery={searchQuery} filter={filter} />
        </main>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2
            className={`text-2xl mb-4 uppercase text-center ${
              theme === "dark" ? "text-white" : "text-customBlack"
            }`}
          >
            New Note
          </h2>
          <TodoForm onClose={closeModal} />
        </Modal>
      </div>
    </div>
  );
}

export default App;
