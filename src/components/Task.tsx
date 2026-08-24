import { BsCheckLg, BsTrash } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import type { ITask } from "../App";

interface TaskProps {
  item: ITask;
  activeTab: boolean;
  onHandleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

function Task({ item, activeTab, onHandleTask, onDeleteTask }: TaskProps) {
  return (
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
          onClick={() => onDeleteTask(item.id)}
          className="delete-task-button flex-center"
        >
          <BsTrash />
        </button>
        <button
          onClick={() => onHandleTask(item.id)}
          className="done-task-button flex-center"
        >
          <BsCheckLg fill={activeTab ? "" : "#ea7c69"} />
        </button>
      </div>
    </li>
  );
}

export default Task;
