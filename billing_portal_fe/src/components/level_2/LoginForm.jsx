"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CustomTextField from "../level_1/CustomTextField";
import { useState, useEffect } from "react";
import CustomButton from "../level_1/CustomButton";
import axios from "axios";
import { useGlobal } from "@/context/GlobalContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function LoginForm() {
  const { loginOpen, setLoginOpen, user, setUser } = useGlobal();

  const [postResponse, setPostResponse] = useState();
  const [login, setLogin] = useState();

  useEffect(() => {
    if (user.isLoggedIn === true) {
      setLoginOpen(false);
    }
  }, [user.isLoggedIn]);

  useEffect(() => {
    if (user.isLoggedIn === false) {
      if (postResponse && postResponse.status === 200) {
        setUser((prev) => ({ ...prev, isLoggedIn: true }));
        // setLoginOpen(false);
      }
    }
  }, [postResponse]);

  useEffect(() => {
    if (user.username != "" && user.password != "") {
      const fetchData = async () => {
        const postData = { username: user.username, password: user.password };
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login/`,
            postData
          );
          setPostResponse(response);
        } catch (error) {
          console.error("Error posting data:", error);
        } finally {
        }
      };
      fetchData();
    }
  }, [login]);
  return (
    <form>
      <Modal
        open={loginOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" flex flex-col gap-y-[1rem]">
            <div>
              <CustomTextField
                label="username"
                value={user.username}
                setValue={(newValue) =>
                  setUser((prevUser) => ({ ...prevUser, username: newValue }))
                }
              />
            </div>
            <div>
              <CustomTextField
                label="password"
                type="password"
                value={user.password}
                setValue={(newValue) =>
                  setUser((prevUser) => ({ ...prevUser, password: newValue }))
                }
              />
            </div>
            <CustomButton
              sx={{ backgroundColor: "grey", color: "white" }}
              onClick={() => setLogin(true)}
            >
              Login
            </CustomButton>
          </div>
        </Box>
      </Modal>
    </form>
  );
}
