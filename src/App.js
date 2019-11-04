import React from "react";
import Calendar from "./components/Calendar";
import "./App.css";

const configObject = {
  todayDate: Date.now(),
  monthsOfCalendar: ["2019-11", "2019-11"],
  clickableDays: ["2019-11-03", "2019-11-06"],
  blockedDays: ["2019-11-04", "2019-11-10"]
};

function App() {
  return <Calendar config={configObject} />;
}

export default App;
