import React, { useCallback, useEffect, useRef, useState } from "react";
import MenuUI from "../components/reminders/Menu";
import { store } from "../reducers";
import { setData } from "../reducers/dateReducer";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDaysUntilFinishWeek(lastMonth, nextMonth) {
  return (
    lastMonth.getMonth() === nextMonth.getMonth() && lastMonth.getDay() === 6
  );
}

function Calendar(props) {
  const date = new Date();

  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [daysInMoth, setDaysInMonth] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function reminderOpen($event) {
    setAnchorEl($event.currentTarget);
  }

  function reminderClose() {
    setAnchorEl(null);
  }

  function getDates(year, month, date) {
    return new Date(year, month, date);
  }

  function formatLastAndNextMonthDates(...props) {
    const [lastMonth, currentMonth, nextMonth] = props;
    if (
      lastMonth.getMonth() < currentMonth.getMonth() ||
      lastMonth.getMonth() === nextMonth.getMonth()
    ) {
      return {
        isOtherMonth: true,
        dateConcatWithMonth: `${
          lastMonth.getMonth() + 1
        }/${lastMonth.getDate()}`,
      };
    } else {
      return `${lastMonth.getDate()}`;
    }
  }

  function reminderTitle(date) {
    return `${date.toLocaleString("default", {
      weekday: "long",
    })}, ${date.toLocaleString("default", {
      month: "long",
    })}, ${date.getDate()}, ${date.getFullYear()}`;
  }

  const getDaysInMonth = useCallback(() => {
    const lastDayInMonth = 6 - getDates(year, month, 0).getDay();
    const currentMonth = getDates(year, month - 1, 1);
    const lastMonth = getDates(year, month - 1, -currentMonth.getDay() + 1);
    const nextMonth = getDates(year, month, lastDayInMonth);
    let flag = true;
    let days = [];

    while (lastMonth.getMonth() <= nextMonth.getMonth() && flag) {
      if (getDaysUntilFinishWeek(lastMonth, nextMonth)) flag = false;
      days.push({
        reminderTitle: reminderTitle(lastMonth),
        date: formatLastAndNextMonthDates(lastMonth, currentMonth, nextMonth),
        day: lastMonth.getDay(),
      });
      lastMonth.setDate(lastMonth.getDate() + 1);
    }

    const calendar = daysOfWeek.map((d, index) => {
      return days.filter((dayOfWeek) => dayOfWeek.day === index);
    });

    setDaysInMonth(calendar);
  }, [month, year]);

  function condicionalClassName({ date, day }) {
    if (date.isOtherMonth) {
      if (day !== 6 && day !== 0) return "otherMonthNotWeekend";

      return "otherMonth";
    } else if (day === 6 || !day) {
      return "color-weekend";
    } else {
      return "currentMonth";
    }
  }

  function handleDate(week) {
    store.dispatch(setData(week));
    console.log(store.getState());
    // localStorage.setItem("save-event", JSON.stringify(week));
    // daysInMoth.forEach((handle, index) => {
    //   handle.forEach((handle2) => {
    //     if (handle2.date === week.date) handle2.event = [];
    //   });
    // });
  }

  function renderCalendar() {
    return daysInMoth.map((week, index) => {
      return (
        <div className="data-calendar">
          <header>
            <span key={index}>{daysOfWeek[index]}</span>
          </header>
          <div className="days-calendar-container">
            {week.map((week) => (
              <div
                onClick={($event) => {
                  handleDate(week);
                  reminderOpen($event);
                }}
                className={condicionalClassName(week)}
              >
                {week.date?.dateConcatWithMonth ?? week.date}
              </div>
            ))}
            <MenuUI
              handlerClose={() => reminderClose()}
              open={open}
              anchor={anchorEl}
            />
          </div>
        </div>
      );
    });
  }

  useEffect(() => {
    getDaysInMonth();
  }, [getDaysInMonth]);

  return (
    <div className="app">
      <div className="container">
        <div className="container-days">{renderCalendar()}</div>
      </div>
    </div>
  );
}

export default Calendar;
