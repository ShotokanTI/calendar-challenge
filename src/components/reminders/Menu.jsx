import Menu from "@mui/material/Menu";
import { useEffect, useState } from "react";
import DetailsMenu from "./DetailsMenu";
import { FormMenu } from "./FormMenu";

function paperProps(...props) {
  const [elevation] = props;
  return {
    elevation: elevation,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 3px #44424251)",
      mt: 1.5,
      mr: 3,
      "& .MuiMenu-list": {
        padding: 0,
      },
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.2,
        mr: 3,
      },
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 20,
        left: -5,
        width: 30,
        height: 30,
        bgcolor: "#2F74B5",
        transform: "translateY(-50%) rotate(135deg)",
        zIndex: 0,
      },
    },
  };
}

export default function MenuUI({
  anchor,
  open,
  handlerClose,
  calendarEvents,
  ...props
}) {
  const [openNewEvent, setOpenNewEvent] = useState(false);
  const [anchorNewEvent, setAnchorNewEvent] = useState(null);
  useEffect(() => {
    if (open) setAnchorNewEvent(anchor);
  }, [anchor, anchorNewEvent]);
  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchor}
        open={open}
        onClose={handlerClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={paperProps(1)}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "left" }}
      >
        <DetailsMenu
          calendarEvents={calendarEvents}
          handlerClose={() => {
            handlerClose();
            setOpenNewEvent(true);
          }}
        ></DetailsMenu>
      </Menu>
      <Menu
        anchorEl={anchorNewEvent}
        open={openNewEvent}
        onClose={() => setOpenNewEvent(false)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={paperProps(7)}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "left" }}
      >
        <FormMenu handlerSaveEvent={() => props.handlerSaveEvent()}></FormMenu>
      </Menu>
    </>
  );
}
