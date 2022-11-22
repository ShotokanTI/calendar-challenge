import {
  Event,
  LocationOn,
  Notifications,
  QueryBuilder,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { store } from "../../reducers";
import { setEvent } from "../../reducers/dateReducer";

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
export function FormMenu(props) {
  const [onSubmit, setOnSubmit] = useState(false);
  const [fromHour, setFromHour] = useState(null);
  const [initialHour, setInitialHour] = useState([]);
  const [finalHour, setFinalHour] = useState([]);
  const [saveEvent, setSaveEvent] = useState({
    eventName: "",
    initialHour: "8:00:00 AM",
    finalHour: "8:30:00 AM",
    city: "",
    remindMe: "",
  });

  function submitFormEvent() {
    const allFilled = Object.values(saveEvent).every((value) => value);
    if (allFilled) {
      store.dispatch(setEvent(saveEvent));
    }
  }

  function chosenDateTimeStampToLocaleDate(date) {
    return new Date(new Date().setTime(date));
  }

  const pushHours = (
    setCallback,
    initialHour = new Date(new Date().setHours(0, 0, 0, 0))
  ) => {
    const dateFuture = new Date(
      initialHour.getFullYear(),
      initialHour.getMonth(),
      initialHour.getDate() + 1,
      23,
      59,
      59
    );
    const hours = [];
    while (
      initialHour.toLocaleDateString() !== dateFuture.toLocaleDateString()
    ) {
      hours.push({
        label: initialHour.toLocaleTimeString(),
        period: initialHour.toLocaleTimeString().split(" ")[1],
        timestamp: initialHour.getTime(),
      });
      initialHour.setMinutes(initialHour.getMinutes() + 30);
    }
    setCallback(hours);
  };

  useEffect(() => {
    const createHours = () => {
      pushHours(setInitialHour);
    };
    createHours();
  }, []);

  useEffect(() => {
    if (fromHour) pushHours(setFinalHour, fromHour);
  }, [fromHour]);

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
        <Stack direction="row" spacing={2}>
          <Event></Event>
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Input
              onChange={(e) =>
                setSaveEvent({ ...saveEvent, eventName: e.target.value })
              }
              sx={{ width: "100%" }}
              placeholder="Event Name"
              error={saveEvent.eventName === "" && onSubmit}
            ></Input>
            {saveEvent.eventName === "" && onSubmit && (
              <Typography color="red" fontWeight="bold" fontSize={12}>
                Event field is empty.
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack
          sx={{ width: "100%" }}
          spacing={2}
          direction="row"
          alignItems="end"
        >
          <QueryBuilder></QueryBuilder>
          <Autocomplete
            error={saveEvent.initialHour === "" && onSubmit}
            value={saveEvent.initialHour}
            groupBy={(options) => options.period}
            sx={{ width: "100%" }}
            autoHighlight
            options={initialHour}
            size="small"
            onLoad={() => console.log("oi")}
            onChange={(event, { timestamp, label }) => {
              setFromHour(chosenDateTimeStampToLocaleDate(timestamp));
              setSaveEvent({ ...saveEvent, initialHour: label });
            }}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Initial Hour" />
            )}
          ></Autocomplete>
          <Typography variant="subtitle1">to</Typography>
          <Autocomplete
            error={saveEvent.finalHour === "" && onSubmit}
            value={saveEvent.finalHour}
            groupBy={(options) => options.period}
            sx={{ width: "100%" }}
            size="small"
            options={finalHour}
            onChange={(event, { label }) => {
              setSaveEvent({ ...saveEvent, finalHour: label });
            }}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Final Hour" />
            )}
          ></Autocomplete>
        </Stack>
        <Stack direction="row" spacing={2}>
          <LocationOn></LocationOn>
          <Stack sx={{ width: "100%" }} spacing={1} alignItems="start">
            <Input
              error={saveEvent.city === "" && onSubmit}
              onChange={(event) => {
                setSaveEvent({ ...saveEvent, city: event.target.value });
              }}
              sx={{ width: "100%" }}
              placeholder="Location/City"
            ></Input>
            {saveEvent.city === "" && onSubmit && (
              <Typography color="red" fontWeight="bold" fontSize={12}>
                City field is empty.
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack height={35} alignItems="center" direction="row" spacing={2}>
          <Notifications></Notifications>
          <Typography variant="subtitle2">Remind me:</Typography>
          <Stack pt={1} spacing={1} alignItems="center">
            <Select
              error={saveEvent.remindMe === "" && onSubmit}
              labelId="error-remind-label"
              variant="standard"
              onChange={(e) => {
                setSaveEvent({ ...saveEvent, remindMe: e.target.value });
              }}
              sx={{ width: "200px", marginLeft: "5px" }}
              size="small"
            >
              {remindMeBefore.map((item, key) => (
                <MenuItem key={key} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            {saveEvent.remindMe === "" && onSubmit && (
              <Typography color="red" fontWeight="bold" fontSize={12}>
                No item selected.
              </Typography>
            )}
          </Stack>
        </Stack>
        <Button
          onClick={() => {
            setTimeout(() => {
              props.handlerSaveEvent();
            }, 500);
            submitFormEvent();
            setOnSubmit(true);
          }}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </Stack>
    </>
  );
}
