import { Typography } from "@mui/material";
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
  const [daysInMonth, setDaysInMonth] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const date = new Date();
  const year = date.getFullYear();
  const open = Boolean(anchorEl);
  const month = date.getMonth() + 1;

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

  function groupByWeekDay(days) {
    return daysOfWeek.map((d, index) => {
      return days.filter((dayOfWeek) => dayOfWeek.day === index);
    });
  }

  const getDaysInMonth = useCallback(() => {
    const lastDayInMonth = 6 - getDates(year, month, 0).getDay();
    const currentMonth = getDates(year, month - 1, 1);
    const lastMonth = getDates(year, month - 1, -currentMonth.getDay() + 1);
    const nextMonth = getDates(year, month, lastDayInMonth);
    let flag = true;
    let days = [];

    const reminder = JSON.parse(localStorage.getItem("eventDay"));

    while (lastMonth.getMonth() <= nextMonth.getMonth() && flag) {
      if (getDaysUntilFinishWeek(lastMonth, nextMonth)) flag = false;
      days.push({
        reminderTitle: reminderTitle(lastMonth),
        date: formatLastAndNextMonthDates(lastMonth, currentMonth, nextMonth),
        day: lastMonth.getDay(),
        event: reminder?.filter(
          (remind) => remind.dateChoise === reminderTitle(lastMonth)
        ),
      });
      lastMonth.setDate(lastMonth.getDate() + 1);
    }

    setDaysInMonth(groupByWeekDay(days));
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
    // daysInMonth.forEach((handle, index) => {
    //   handle.forEach((handle2) => {
    //     if (handle2.date === week.date) handle2.event = [];
    //   });
    // });
  }

  const updateCalendarEvents = useCallback(
    () => getDaysInMonth(),
    [getDaysInMonth]
  );

  useEffect(() => {
    updateCalendarEvents();
  }, [updateCalendarEvents]);

  return (
    <div className="app">
      <div className="container">
        <div className="container-days">
          {daysInMonth.map((week, index) => {
            return (
              <div key={index} className="data-calendar">
                <header>
                  <span>{daysOfWeek[index]}</span>
                </header>
                <div className="days-calendar-container">
                  {week.map((week, index) => {
                    return (
                      <div
                        key={index}
                        style={{ height: "120px" }}
                        onClick={($event) => {
                          handleDate(week);
                          reminderOpen($event);
                        }}
                        className={condicionalClassName(week)}
                      >
                        <span>
                          {week.date?.dateConcatWithMonth ?? week.date}
                        </span>
                        <div className="dayCalendar">
                          {week.event?.map((event, index) => {
                            return (
                              <Typography
                                key={index}
                                variant="subtitle2"
                                className="eventTitle"
                              >
                                {event.saveEvent?.eventName}
                              </Typography>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <MenuUI
            calendarEvents={daysInMonth}
            handlerClose={() => reminderClose()}
            open={open}
            anchor={anchorEl}
            handlerSaveEvent={() => getDaysInMonth()}
          />
          ;
        </div>
      </div>
    </div>
  );
}

export default Calendar;
