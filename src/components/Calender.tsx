import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calender.css";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type CustomInputProps = {
  className?: string;
  value?: string;
  onClick?: () => void;
};

// const CustomInput = forwardRef<CustomInputProps>(
//   ({ value, onClick, className }, ref) => (
//     <button type="button" className={className} onClick={onClick} ref={ref}>
//       {value || "Välj datum"}
//     </button>
//   ),
// );
// CustomInput.displayName = "CustomInput";

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
      <div className="month-carousel">
        <IoIosArrowBack />

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MMMM, yyyy"
          showIcon
          // customInput={<CustomInput className="custom-input" />}
        />

        <IoIosArrowForward />
      </div>

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
