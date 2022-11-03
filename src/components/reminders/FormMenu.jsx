import { Autocomplete, Input, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect } from "react";

export function FormMenu() {
  const time = [];
  const remindMeBefore = [
    "Never",
    "0 minutes before",
    "5 minutes before",
    "30 minutes before",
    "1 hour before",
    "12 hours before",
    "1 day before",
    "1 week before",
  ];

  useEffect(() => {
    const date = new Date(new Date().setHours(0, 0, 0, 0));
    const dateFuture = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
      23,
      59,
      59
    );
    while (date.toLocaleDateString() !== dateFuture.toLocaleDateString()) {
      time.push({
        label: date.toLocaleTimeString(),
        period: date.toLocaleTimeString().split(" ")[1],
      });
      date.setMinutes(date.getMinutes() + 30);
    }
  }, []);

  return (
    <>
      <Stack sx={{ width: "100%", backgroundColor: "#2F74B5" }}>
        <Typography p={1} pl={3} variant="h6" color="white">
          Add Event
        </Typography>
      </Stack>
      <Stack
        sx={{ width: "500px", minWidth: "250px", minHeight: "150px" }}
        direction="column"
        justifyContent="space-between"
        spacing={3}
        margin={3}
        marginTop={2}
      >
        <Input placeholder="Event Name"></Input>
        <Stack
          sx={{ width: "100%" }}
          spacing={2}
          direction="row"
          alignItems="end"
        >
          <Autocomplete
            defaultValue={"8:00:00 AM"}
            groupBy={(options) => options.period}
            sx={{ width: "100%" }}
            options={time}
            size="small"
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Time" />
            )}
          ></Autocomplete>
          <Typography variant="subtitle1">to</Typography>
          <Autocomplete
            defaultValue={"8:30:00 AM"}
            groupBy={(options) => options.period}
            sx={{ width: "100%" }}
            size="small"
            options={time}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Time" />
            )}
          ></Autocomplete>
        </Stack>
        <Input placeholder="Location/City"></Input>
        <Stack height={20} alignItems="end" direction="row">
          <Typography variant="subtitle2">Remind me:</Typography>
          <Autocomplete
            sx={{ width: "200px", marginLeft: "10px" }}
            options={remindMeBefore}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="12 hours before"
              />
            )}
          ></Autocomplete>
        </Stack>
      </Stack>
    </>
  );
}
