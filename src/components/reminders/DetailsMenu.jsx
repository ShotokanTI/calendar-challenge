import { Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "../../sass/detailsmenu.module.scss";

import { AddCircle } from "@mui/icons-material";

export default function DetailsMenu(props) {
  const date = useSelector((storeState) => storeState.date.dateChoise);
  return (
    <Stack
      sx={{ width: "300px", minWidth: "250px", minHeight: "150px" }}
      direction="column"
      justifyContent="space-between"
    >
      <div className={styles.title}>{date}</div>
      <div className={styles.bodyContainer}></div>
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
