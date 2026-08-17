import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const todo = [
    {
      task: "Take out the trash",
      date: "Aug 16",
      completed: false,
    },
    {
      task: "Do the laundry",
      date: "Aug 16",
      completed: false,
    },
    {
      task: "Clean the kitchen",
      date: "Aug 16",
      completed: true,
    },
  ];

  return (
    <div className="container">
      <section className="task-container">
        <div>
          <h1>Daily Task</h1>
          <p>2/5 Task Completed</p>
        </div>
        <div>
          <p>
            You are almost done go ahead <span>40%</span>
          </p>
          <div className="bar">BAR PLACEHOLDER</div>
        </div>
      </section>

      <section className="add-task-container">
        <input type="text" placeholder="Add a new task..." />
        <button>+</button>
      </section>

      <section className="task-state">
        <button>Active (3)</button>
        <button>Completed (2)</button>
      </section>

      <section className="task-list">
        <h2>Todays task</h2>
        <ul>
          {todo.map((item, index) => (
            <li key={index}>
              <div>
                <p>{item.task}</p>
                <p>{item.date}</p>
              </div>
              <button>✓</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
