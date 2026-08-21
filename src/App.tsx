import { useState } from "react";
import "./App.css";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { BsCheck2Circle, BsTrash, BsPlusLg, BsCheckLg } from "react-icons/bs";
import { useLocalStorage } from "usehooks-ts";

interface Task {
  id: string;
  task: string;
  date: string;
  border: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("todo-key", []);

  const borderColors = ["--green", "--blue", "--pink", "--orange", "--purple"];

  const [activeTab, setActiveTab] = useState(false);

  const [addTask, setAddTask] = useState("");

  const procent = Math.round(
    (tasks.filter((task) => task.completed).length / tasks.length) * 100,
  );

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  function handleTask(id: string | number) {
    let task = tasks.find((task) => task.id === id);

    if (task) {
      let newTodo = tasks.filter((todo) => todo.id !== task.id);
      task.completed = !task.completed;
      setTasks([...newTodo, task]);
    } else {
      return;
    }
  }

  function deleteTask(id: string) {
    let task = tasks.find((task) => task.id === id);

    if (task) {
      let newTodo = tasks.filter((todo) => todo.id !== task.id);
      setTasks(newTodo);
    } else {
      return;
    }
  }

  function addNewTask() {
    if (addTask !== "") {
      let id = crypto.randomUUID();
      setTasks([
        ...tasks,
        {
          id: id,
          completed: false,
          task: addTask.charAt(0).toUpperCase() + addTask.slice(1),
          date: today,
          border: borderColors[Math.floor(Math.random() * borderColors.length)],
        },
      ]);
      setAddTask("");
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
            You are almost done go ahead <span>{procent ? procent : 0}%</span>
          </p>
          <div className="bar">
            <div style={{ width: `${procent}%` }}></div>
          </div>
        </div>
      </section>

      <section className="add-task-container">
        <input
          value={addTask}
          onChange={(e) => setAddTask(e.target.value)}
          type="text"
          placeholder="Add a new task..."
          onKeyDown={(e) => e.key === "Enter" && addNewTask()}
        />
        <button onClick={() => addNewTask()} className="flex-center">
          <BsPlusLg fill="black" />
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

      <section>
        <h2>{activeTab ? "Completed" : "Todays task"}</h2>
        {tasks.length === 0 ? (
          <div className="no-task">
            <div className="check-mark flex-center">
              <BsCheck2Circle size={`5rem`} fill="#ea7c69" />
            </div>
            <h3>No tasks left!</h3>
            <p className="create-new-task-text">
              Create a new task to get started
            </p>
          </div>
        ) : (
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
                      <MdOutlineCalendarMonth /> {item.date}
                    </p>
                  </div>
                  <div className="task-buttons ">
                    <button
                      onClick={() => deleteTask(item.id)}
                      className="delete-task-button flex-center"
                    >
                      <BsTrash />
                    </button>
                    <button
                      onClick={() => handleTask(item.id)}
                      className="done-task-button flex-center"
                    >
                      <BsCheckLg fill={activeTab ? "" : "#ea7c69"} />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
