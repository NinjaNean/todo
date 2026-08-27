import { useState } from "react";
import "./App.css";
import { BsCheck2Circle, BsPlusLg } from "react-icons/bs";
import { useLocalStorage } from "usehooks-ts";
import Task from "./components/Task";
import Calender from "./components/Calender";

export interface ITask {
  id: string;
  task: string;
  date: Date;
  border: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useLocalStorage<ITask[]>("todo-key", []);

  const borderColors = ["--green", "--blue", "--pink", "--orange", "--purple"];

  const [activeTab, setActiveTab] = useState(false);

  const [addTask, setAddTask] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const procent = Math.round(
    (tasks.filter((task) => task.completed).length / tasks.length) * 100,
  );

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
          date: selectedDate,
          border: borderColors[Math.floor(Math.random() * borderColors.length)],
        },
      ]);
      setAddTask("");
    } else {
      return;
    }
  }

  function isSameDay(taskDate: Date | string, selectedDate: Date): boolean {
    if (!taskDate || !selectedDate) return false;

    const d1 = new Date(taskDate);
    const d2 = new Date(selectedDate);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

    return d1.toDateString() === d2.toDateString();
  }

  return (
    <div className="container">
      <Calender onSelectDate={(date) => setSelectedDate(date)} />

      <section className="task-container">
        <div>
          <h1>Daily Task</h1>
          <p className="task-completed-text">
            {tasks.filter((task) => task.completed).length}/{tasks.length} Task
            Completed
          </p>
        </div>
        <div>
          <p className="bar-text">
            {procent === 100
              ? "All done - nice work!"
              : "You are almost done go ahead"}{" "}
            <span>{procent ? procent : 0}%</span>
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
              {activeTab
                ? "No completed tasks for this day yet."
                : "Nothing left for this day. Add a task above."}
            </p>
          </div>
        ) : (
          <ul className={activeTab ? "completed" : ""}>
            {tasks
              .filter(
                (task) =>
                  task.completed === activeTab &&
                  isSameDay(task.date, selectedDate),
              )
              .map((item) => (
                <Task
                  item={item}
                  activeTab={activeTab}
                  onHandleTask={handleTask}
                  onDeleteTask={deleteTask}
                />
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
