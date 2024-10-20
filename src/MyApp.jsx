import React, { useState, useEffect } from "react";
// import { Trash2, Edit, Check, X } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import sleepy from "./sleepy2.gif";
import { FaEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";

const TodoApp = () => {
  //These are the states that we will be using in our app
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [incompleteTasks, setIncompleteTasks] = useState(0);

  // Get todos from localStorage when the component mounts

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
      console.log(todos.length);
    }
  }, []);

  useEffect(() => {
    const incompleteTasks = todos.filter((todo) => !todo.completed).length;
    setIncompleteTasks(incompleteTasks);
  }, [todos]);

  // This function adds a new todo to the todos state

  const addTodo = (e) => {};

  //This function deletes a todo from the todos state

  const deleteTodo = (id) => {};

  // This function toggles the completed status of a todo, its that checkbox thingy

  const toggleTodo = (id) => {};

  // Write the toggleCompleted function here for the hide completed button
  // function toggleCompleted(){}

  // This function starts the editing process of a todo
  const startEditing = (id, text) => {};

  // This function saves the edited todo
  const saveEdit = (id) => {};

  // This fuction cancels the editing process
  const cancelEdit = () => {};

  return (
    <div className="h-[100vh] rounded-lg shadow-xl  flex flex-col md:flex-row items-center justify-evenly  ">
      <div className="lefbox md:w-1/3 flex flex-col gap-6 mt-6 md:mt-0">
        <h1 className="text-5xl font-bold  tracking-wide text-center">
          Karya Suchi
        </h1>
        <form
          onSubmit={addTodo}
          className=" border-t-2 border-neutral-500  border-opacity-45 py-10 flex flex-col items-center gap-6"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo"
            className="w-full p-2 border border-neutral-500 rounded-md focus:outline-none bg-[#121212] text-white "
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
              className="anotherButton w-fit hover:bg-neutral-700 "
            >
              Hide Completed
            </button>
          </div>
        </form>
      </div>
      <div className="rightbox flex flex-col items-center md:justify-center w-full flex-wrap md:flex-nowrap md:w-1/3 h-[100%] relative">
        {todos.length != 0 ? (
          <div className="todoCounter text-neutral-400 mb-4 bottom-[8%] text-lg visible md:hidden ">
            {incompleteTasks} Todos Incomplete
          </div>
        ) : (
          <></>
        )}
        <div className="todoBox h-[70%] w-full md:overflow-auto border-t-2 md:border-2 border-neutral-700  border-opacity-50 rounded-lg p-2">
          {todos.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="text-2xl">You got no work dude</div>
              <img src={sleepy} alt="sleepy" className="" />
            </div>
          ) : (
            <ul className=" py-2 ">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center my-2 p-2  rounded "
                >
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
                          className="mr-2  appearance-none w-5 h-5 border border-neutral-600 rounded-sm bg-[#121212]
                          checked:bg-[#00e5ff] checked:border-[#00e5ff] hover:ring-1 hover:ring-[#00e5ff] hover:cursor-pointer focus:outline-none
    mt-1"
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
        {todos.length != 0 ? (
          <div className="todoCounter text-neutral-400 absolute bottom-[8%] text-lg invisible md:visible ">
            {incompleteTasks} Todos Incomplete
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
