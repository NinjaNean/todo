import { useState } from "react";
import "./App.css";
import {
  MdCalendarMonth,
  MdOutlineCheck,
  MdOutlineAdd,
  MdOutlineDelete,
} from "react-icons/md";

function App() {
  const [tasks, setTask] = useState([
    {
      id: 1,
      task: "Take out the trash",
      date: "Aug 16",
      border: "--pink",
      completed: false,
    },
    {
      id: 2,
      task: "Do the laundry",
      date: "Aug 16",
      border: "--orange",
      completed: false,
    },
    {
      id: 3,
      task: "Clean the kitchen",
      date: "Aug 16",
      border: "--green",
      completed: false,
    },
    {
      id: 4,
      task: "Take a walk",
      date: "Aug 16",
      border: "--purple",
      completed: true,
    },
    {
      id: 5,
      task: "Vacum the house",
      date: "Aug 16",
      border: "--blue",
      completed: true,
    },
  ]);

  let procent =
    (tasks.filter((task) => task.completed).length / tasks.length) * 100;

  const [activeTab, setActiveTab] = useState(false);

  function handleTask(id: string | number) {
    let task = tasks.find((task) => task.id === id);

    if (task) {
      let newTodo = tasks.filter((todo) => todo.id !== task.id);
      task.completed = !task.completed;
      setTask([...newTodo, task]);
    } else {
      return;
    }
  }

  function deleteTask(id: string | number) {
    let task = tasks.find((task) => task.id === id);

    if (task) {
      let newTodo = tasks.filter((todo) => todo.id !== task.id);
      setTask(newTodo);
    } else {
      return;
    }
  }

  return (
    <div className="container">
      <section className="task-container">
        <div>
          <h1>Daily Task</h1>
          <p className="task-completed-text">
            {" "}
            {tasks.filter((task) => task.completed).length}/{tasks.length} Task
            Completed
          </p>
        </div>
        <div>
          <p className="bar-text">
            You are almost done go ahead <span>{procent}%</span>
          </p>
          <div className="bar">
            <div style={{ width: `${procent}%` }}></div>
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
        <button
          onClick={() => setActiveTab(false)}
          className={activeTab ? "" : "active-tab"}
        >
          Active ({tasks.filter((task) => task.completed === false).length})
        </button>
        <button
          onClick={() => setActiveTab(true)}
          className={!activeTab ? "" : "active-tab"}
        >
          Completed ({tasks.filter((task) => task.completed).length})
        </button>
      </section>

      <section className="task-list">
        <h2>{activeTab ? "Completed" : "Todays task"}</h2>
        <ul className={activeTab ? "completed" : ""}>
          {tasks
            .filter((task) => task.completed === activeTab)
            .map((item) => (
              <li
                key={item.id}
                className="task"
                style={{ borderColor: `var(${item.border})` }}
              >
                <div>
                  <p className="task-text">{item.task}</p>
                  <p className="added-date">
                    <MdCalendarMonth /> {item.date}
                  </p>
                </div>
                <div className="task-buttons ">
                  <button
                    onClick={() => deleteTask(item.id)}
                    className="delete-task-button flex-center"
                  >
                    <MdOutlineDelete />
                  </button>
                  <button
                    onClick={() => handleTask(item.id)}
                    className="done-task-button flex-center"
                  >
                    <MdOutlineCheck fill={activeTab ? "" : "#ea7c69"} />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
