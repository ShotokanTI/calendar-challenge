import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "../sass/detailsmenu.module.scss";
import { Add } from "@mui/icons-material";

export default function DetailsMenu() {
  const date = useSelector((storeState) => storeState.date.dateChoise);
  return (
    <div className={styles.container}>
      <div className={styles.title}>{date}</div>
      <div className={styles.bodyContainer}></div>
      <div className={styles.eventAdd}>
        <Button
          style={{ background: "gray" }}
          variant="contained"
          startIcon={<Add />}
        >
          New Event
        </Button>
      </div>
    </div>
  );
}
