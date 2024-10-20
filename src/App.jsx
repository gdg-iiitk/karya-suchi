import React, { useState, useEffect } from "react";
// import { Trash2, Edit, Check, X } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";

import { FaEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Get todos from localStorage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
      console.log(todos.length);
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      const updatedTodos = [
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id == id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Write the toggleCompleted function here
  // function toggleCompleted(){}

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = (id) => {
    if (editValue.trim() === "") {
      setEditingId(null);
      return;
    }
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editValue } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="h-[100vh] rounded-lg shadow-xl  flex  items-center justify-evenly lg:flex">
      <div className="lefbox w-1/3 flex flex-col gap-6">
        <h1 className="text-5xl font-bold text-center">Karya Suchi</h1>
        <form
          onSubmit={addTodo}
          className=" border-t-2 border-neutral-500  border-opacity-45 p-10 flex flex-col items-center gap-6"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo"
            className="w-full p-2 border border-neutral-500 rounded-md focus:outline-none"
          />
          <div className=" flex gap-4 m-3">
            <button
              type="submit"
              className="mainButton w-fit hover:bg-[#92e9f2] "
            >
              + Add Task
            </button>
            <button
              type="submit"
              className="anotherButton w-fit hover:bg-neutral-500 "
            >
              Hide Completed
            </button>
          </div>
        </form>
      </div>
      <div className="rightbox h-[70%] w-1/3  overflow-auto border-2 border-neutral-700  border-opacity-50 rounded-lg p-2">
        {todos.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-2xl">You got no work dude</div>
          </div>
        ) : (
          <ul className=" py-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center my-2 p-2  rounded">
                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="editInput w-full bg-neutral-300 px-1 py-1 border-b-2 focus:outline-none bg-opacity-10 "
                    />
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="text-xl mx-4 hover:text-[#00e5ff] focus:text-[#00e5ff]"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => cancelEdit()}
                      className="text-lg mx-3 hover:text-[#00e5ff] focus:text-[#00e5ff]"
                    >
                      <ImCross />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="mr-2 w-5 h-5"
                      />
                    </div>

                    <span
                      className={` flex-grow px-2  ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-2xl mx-3 hover:text-[#00e5ff] f "
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      className="text-2xl mx-3 hover:text-[#00e5ff]  "
                    >
                      <MdEdit />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
