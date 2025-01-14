"use client";
import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Divider from "@mui/material/Divider";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PrintIcon from "@mui/icons-material/Print";
import Groups2Icon from "@mui/icons-material/Groups2";
import PersonIcon from "@mui/icons-material/Person";
import HandymanIcon from "@mui/icons-material/Handyman";
import { useRouter } from "next/navigation";

function CustomSideBar() {
  const Router = useRouter();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sideBar");
      if (storedState !== null) {
        try {
          setOpen(JSON.parse(storedState));
        } catch (error) {
          console.error("Error parsing stored state:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sideBar", JSON.stringify(open));
      } catch (error) {
        console.error("Error saving state to localStorage:", error);
      }
    }
  }, [open]);
  const listData = [
    { text: "Generate Invoice", icon: <PrintIcon />, link: "/" },
    { text: "All Invoice", icon: <ReceiptIcon />, link: "all-invoices" },
    { text: "Services", icon: <HandymanIcon />, link: "services" },
    { text: "Clients", icon: <PersonIcon />, link: "clients" },
    // { text: "Staffs", icon: <Groups2Icon />, link: "staffs" },
  ];
  return (
    <div
      className={`transition-all duration-200 min-h-screen ${
        open ? "w-[15rem] bg-slate-100" : "w-[4rem] bg-slate-300"
      }`}
    >
      <div className="p-2">
        <div>
          {open && (
            <div className="flex items-center gap-2">
              <IconButton className="ml-1" onClick={() => setOpen(false)}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <p>Collapse</p>
            </div>
          )}
          {!open && (
            <div className="flex items-center gap-2">
              <IconButton className="ml-1" onClick={() => setOpen(true)}>
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      <div>
        <List>
          {listData.map((item, index) => (
            <div key={index}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => Router.push(`/${item.link}`)}
                  className="transition-all flex items-center gap-4"
                  style={{
                    justifyContent: "flex-start",
                  }}
                >
                  <ListItemIcon
                    style={{
                      minWidth: "40px",
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: "-3px",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out pt-2 ${
                      open ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                    style={{
                      transitionProperty: "width, opacity",
                    }}
                  >
                    <ListItemText
                      primary={item.text}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    />
                  </div>
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}

export default CustomSideBar;
