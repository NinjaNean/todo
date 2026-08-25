import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calender.css";

function Calender() {
  const [startDate, setStartDate] = useState(new Date());
  const week = ["M", "T", "W", "T", "F", "S", "S"];

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
        {week.map((w, index) => {
          return (
            <div className="day" key={index}>
              <p>{w}</p>
              <p>17</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calender;
