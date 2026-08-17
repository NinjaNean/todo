import { useState } from "react";
import "./App.css";
import { MdCalendarMonth, MdOutlineCheck, MdOutlineAdd } from "react-icons/md";

function App() {
  const [tasks, setTask] = useState([
    {
      task: "Take out the trash",
      date: "Aug 16",
      border: "--pink",
      completed: false,
    },
    {
      task: "Do the laundry",
      date: "Aug 16",
      border: "--orange",
      completed: false,
    },
    {
      task: "Clean the kitchen",
      date: "Aug 16",
      border: "--green",
      completed: true,
    },
  ]);

  return (
    <div className="container">
      <section className="task-container">
        <div>
          <h1>Daily Task</h1>
          <p className="task-completed-text">2/5 Task Completed</p>
        </div>
        <div>
          <p className="bar-text">
            You are almost done go ahead <span>40%</span>
          </p>
          <div className="bar">
            <div style={{ width: `40%` }}></div>
          </div>
        </div>
      </section>

      <section className="add-task-container">
        <input type="text" placeholder="Add a new task..." />
        <button className="flex-center">
          <MdOutlineAdd fill="black" />
        </button>
      </section>

      <section className="task-state">
        <button className="active-tab">Active (3)</button>
        <button>Completed (2)</button>
      </section>

      <section className="task-list">
        <h2>Todays task</h2>
        <ul>
          {tasks.map((item, index) => (
            <li
              key={index}
              className="task"
              style={{ borderColor: `var(${item.border})` }}
            >
              <div>
                <p>{item.task}</p>
                <p className="added-date">
                  <MdCalendarMonth /> {item.date}
                </p>
              </div>
              <button className="done-task flex-center">
                <MdOutlineCheck fill="#ea7c69" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
