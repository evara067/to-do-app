import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const newText = prompt("Edit your task:");

    if (newText && newText.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: newText } : task,
        ),
      );
    }
  };



  return (
    <div className="app">
      <div className="todo-wrapper">
        <h1>My To-Do List</h1>

        <div className="todo-container">
          <div className="input-area">
            <input
              type="text"
              placeholder="Enter your task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />

            <button className="add-btn" onClick={addTask}>
              Add Task
            </button>
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <div className="task-item" key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    setTasks(
                      tasks.map((item) =>
                        item.id === task.id
                          ? {
                              ...item,
                              completed: !item.completed,
                            }
                          : item,
                      ),
                    );
                  }}
                />

                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>

                <button className="edit-btn" onClick={() => editTask(task.id)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
