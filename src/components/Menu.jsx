import Menu from "@mui/material/Menu";

import DetailsMenu from "./DetailsMenu";

export default function MenuUI({ anchor, open, handlerClose, ...props }) {
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
        PaperProps={{
          elevation: 0,
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
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "left" }}
      >
        <DetailsMenu></DetailsMenu>
      </Menu>
    </>
  );
}
