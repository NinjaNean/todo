import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calender.css";
import {
  addDays,
  addWeeks,
  format,
  isSameDay,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import type { ITask } from "../App";
import { useLocalStorage } from "usehooks-ts";

type CalenderProps = {
  onSelectDate: (date: Date) => void;
};

function Calender({ onSelectDate }: CalenderProps) {
  const [tasks, _] = useLocalStorage<ITask[]>("todo-key", []);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });

  const today = new Date();

  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const dayDate = addDays(startOfCurrentWeek, index);
    return {
      dayName: format(dayDate, "EEEEE"), // M, T, O...
      dayNumber: format(dayDate, "d"), // 25
      date: dayDate,
      dot: tasks.some((task) => isSameDay(task.date, dayDate)), //Boolean
    };
  });

  const handlePrevWeek = () => {
    if (selectedDate) {
      setSelectedDate(subWeeks(selectedDate, 1));
    }
  };

  const handleNextWeek = () => {
    if (selectedDate) {
      setSelectedDate(addWeeks(selectedDate, 1));
    }
  };

  function handleDateChange(date: Date) {
    setSelectedDate(date);
    onSelectDate(date);
  }

  const taskDates = tasks.map((task) => new Date(task.date));

  return (
    <div className="date-container">
      <div className="month-carousel">
        <IoIosArrowBack onClick={handlePrevWeek} />

        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (date) {
              setSelectedDate(date);
            }
          }}
          dateFormat="MMMM, yyyy"
          showIcon
          highlightDates={taskDates}
          showPopperArrow={false}
          onFocus={(e) => e.target.blur()}
        />

        <IoIosArrowForward onClick={handleNextWeek} />
      </div>

      <div className="week-carousel">
        {weekDays.map((w, index) => {
          const isSelected = isSameDay(w.date, selectedDate);

          return (
            <div
              className={`day ${isSelected ? "active" : ""} ${isSameDay(today, w.date) ? "today" : ""}`}
              key={index}
              onClick={() => handleDateChange(w.date)}
            >
              <p className="week-day">{w.dayName}</p>
              <p className="day-number">{w.dayNumber}</p>
              <div className={w.dot ? "dot" : "no-dot"}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calender;
