import React, { useEffect, useState } from "react";
import moment from "moment";
import _ from "lodash";

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

/**
 * Day structure
 * date - moment date
 * clickable - boolean
 * blocked - boolean
 */
const Day = day => {
  return day.blank ? (
    <div>blank</div>
  ) : (
    <div>
      {moment(day.date).format("DD")} - {day.blocked ? "blocked" : ""} -{" "}
      {day.clickable ? "clickable" : ""}
    </div>
  );
};

const Calendar = ({ config }) => {
  const { monthsOfCalendar, blockedDays, clickableDays } = config;
  const [controllerMonth] = useState(monthsOfCalendar[0]);

  const hasDateInArray = (day, dateArray) => {
    return !day.blank && dateArray.find(date => moment(date).isSame(day.date));
  };

  const hasInArrayAndSetProp = (days, dateArray, prop) =>
    days.map(day =>
      hasDateInArray(day, dateArray) ? { ...day, [prop]: true } : day
    );

  const padDays = days => {
    const weekday = moment(days[0].date).weekday();
    const padBlankDays = [];
    _.times(weekday, () => padBlankDays.push({ blank: true }));
    return [...padBlankDays, ...days];
  };

  const setBlockedDays = days =>
    hasInArrayAndSetProp(days, blockedDays, "blocked");

  const setClickableDays = days =>
    hasInArrayAndSetProp(days, clickableDays, "clickable");

  const getMonthDays = month => {
    const currentDate = moment(month);
    const lastMonthDay = currentDate.clone().endOf("month");
    const daysOfMonth = [];

    _.times(lastMonthDay.format("DD"), () => {
      daysOfMonth.push({
        date: currentDate.clone(),
        clickable: false,
        blocked: false,
        clickFunction: () => console.log("clicked")
      });
      currentDate.add(1, "day");
    });
    return daysOfMonth;
  };

  useEffect(() => {
    moment.locale("pt-BR");
  }, []);

  return pipe(
    padDays,
    setClickableDays,
    setBlockedDays
  )(getMonthDays(controllerMonth)).map(Day);
};

export default Calendar;
