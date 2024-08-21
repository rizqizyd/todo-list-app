import create from "zustand";
import { Todo } from "../types/todo";

interface TodoState {
  todos: Todo[];
  toggleCompletion: (id: number) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, updatedTodo: Partial<Omit<Todo, "id">>) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const LOCAL_STORAGE_KEY = "todos";

const loadTodosFromStorage = (): Todo[] => {
  const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const saveTodosToStorage = (todos: Todo[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

const useTodoStore = create<TodoState>(set => ({
  todos: loadTodosFromStorage(),
  theme: "light",
  toggleCompletion: id =>
    set(state => {
      const newTodos = state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodosToStorage(newTodos);
      return { todos: newTodos };
    }),
  addTodo: todo =>
    set(state => {
      const newTodos = [...state.todos, todo];
      saveTodosToStorage(newTodos);
      return { todos: newTodos };
    }),
  deleteTodo: id =>
    set(state => {
      const newTodos = state.todos.filter(todo => todo.id !== id);
      saveTodosToStorage(newTodos);
      return { todos: newTodos };
    }),
  editTodo: (id: number, updatedTodo: Partial<Omit<Todo, "id" | "datetime">>) =>
    set(state => {
      const updatedTodos = state.todos.map(todo =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),
  toggleTheme: () =>
    set(state => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

export default useTodoStore;
