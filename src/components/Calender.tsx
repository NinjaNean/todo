import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calender.css";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";

function Calender() {
  const [startDate, setStartDate] = useState(new Date());
  const startOfCurrentWeek = startOfWeek(startDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const dayDate = addDays(startOfCurrentWeek, index);
    return {
      dayName: format(dayDate, "EEEEE"), // M, T, O...
      dayNumber: format(dayDate, "d"), // 25
      date: dayDate,
    };
  });

  return (
    <div className="date-container">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="MMMM, yyyy"
        className="month"
        showIcon
      />

      <div className="week-carousel">
        {weekDays.map((w, index) => {
          const isSelected = isSameDay(w.date, startDate);

          return (
            <div className={`day ${isSelected ? "active" : ""}`} key={index}>
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
