import { useState } from "react";
import DatePicker from "react-datepicker";

function Calender() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </>
  );
}

export default Calender;
