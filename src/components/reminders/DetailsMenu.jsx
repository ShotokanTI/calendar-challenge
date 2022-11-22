import { Button, Divider, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "../../sass/detailsmenu.module.scss";

import { AddCircle } from "@mui/icons-material";
import { style } from "@mui/system";

export default function DetailsMenu({ calendarEvents, ...props }) {
  const date = useSelector((storeState) => storeState.date.dateChoise);

  function onlyWeekDayWithEvents(events) {
    return events.filter(
      (item) => date === item.reminderTitle && item.event.length
    );
  }

  function randomBorderColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  function renderAllEvents() {
    const [...events] = calendarEvents.flat();

    return onlyWeekDayWithEvents(events);
  }

  return (
    <Stack
      sx={{ width: "300px", minWidth: "250px", minHeight: "150px" }}
      direction="column"
      justifyContent="space-between"
    >
      <div className={styles.title}>{date}</div>
      <div className={styles.bodyContainer}>
        {renderAllEvents().map((item) => {
          return item?.event?.map(
            ({ saveEvent: { eventName, initialHour, finalHour } }) => (
              <Stack
                className={styles.eventDetails}
                flexDirection="row"
                alignItems="center"
                sx={{
                  height: "60px",
                  borderLeft: `5px solid ${randomBorderColor()}`,
                  cursor: "pointer",
                }}
              >
                <Stack px={2}>
                  <Typography variant="body1">{initialHour}</Typography>
                  <Typography variant="body1">{finalHour}</Typography>
                </Stack>
                <Divider
                  variant="middle"
                  orientation="vertical"
                  flexItem
                ></Divider>
                <Typography pl={2} variant="h6" color="#2f74b5">
                  {eventName}
                </Typography>
              </Stack>
            )
          );
        })}
      </div>
      <div className={styles.eventAdd}>
        <Button
          onClick={() => props.handlerClose()}
          style={{ background: "gray" }}
          variant="contained"
          startIcon={<AddCircle />}
        >
          New Event
        </Button>
      </div>
    </Stack>
  );
}
