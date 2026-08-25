import { forwardRef, useState } from "react";
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

type CustomInputProps = {
  className?: string;
  value?: string;
  onClick?: () => void;
};

function Calender() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const dayDate = addDays(startOfCurrentWeek, index);
    return {
      dayName: format(dayDate, "EEEEE"), // M, T, O...
      dayNumber: format(dayDate, "d"), // 25
      date: dayDate,
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

  return (
    <div className="date-container">
      <div className="month-carousel">
        <IoIosArrowBack onClick={handlePrevWeek} />

        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          dateFormat="MMMM, yyyy"
          showIcon
        />

        <IoIosArrowForward onClick={handleNextWeek} />
      </div>

      <div className="week-carousel">
        {weekDays.map((w, index) => {
          const isSelected = isSameDay(w.date, selectedDate);

          return (
            <div
              className={`day ${isSelected ? "active" : ""}`}
              key={index}
              onClick={() => setSelectedDate(w.date)}
            >
              <p>{w.dayName}</p>
              <p>{w.dayNumber}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calender;
