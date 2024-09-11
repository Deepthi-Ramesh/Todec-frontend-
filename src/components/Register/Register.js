import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Grid2 } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HOST_URL } from "../../Constants";

function Register() {
  const history = useNavigate();
  const [snackbar, setsnackbar] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const changeHandler = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = (fieldValues = user) => {
    let temp = { ...errors };

    if ("name" in fieldValues) {
      temp.name = fieldValues.firstname === "" ? " Name is required" : "";
    }

    if ("email" in fieldValues) {
      temp.email =
        fieldValues.email === ""
          ? "Email is required"
          : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(fieldValues.email)
          ? ""
          : "Invalid email";
    }

    if ("password" in fieldValues) {
      temp.password = fieldValues.password === "" ? "password is required" : "";
    }

    if ("confirm_password" in fieldValues) {
      temp.confirm_password =
        fieldValues.confirm_password === ""
          ? "confirm_password is required"
          : "";
    }

    if ("confirm_password" in fieldValues != "password" in fieldValues) {
      temp.confirm_password =
        fieldValues.confirm_password === ""
          ? "confirm_password is not matched "
          : "";
    }

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const onsubmit = async (e) => {
    if (validate()) {
      user.name = user.name;
      try {
        var url = `${HOST_URL}/register`;
        const response = await axios.post(url, {
          User: user,
        });

        if (response.status == 200) {
          console.log("Inserted successfully");
          history("/login");
        }
      } catch (error) {
        var msg = error.response.data.message;
        if (msg.includes("email")) {
          window.alert("email already exists");
        }
      }
    } else {
      console.log("not validate");
    }
  };

  return (
    <Grid2
      container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"100vh"}
      style={{ backgroundColor: " hsl(235, 24%, 19%)" }}
    >
      <Grid2
        container
        xs={5}
        md={5}
        spacing={3}
        direction="column"
        style={{
          border: "3px solid orange",
          padding: "3rem",
          justifyContent: "center",
          backgroundColor: "#e8e7e6",
          width: "29%",
        }}
      >
        <Grid2 item xs={12} style={{ textAlign: "center", color: "black" }}>
          <h2>REGISTER</h2>
        </Grid2>
        <Grid2 item xs={12} md={6} sm={7}>
          <TextField
            fullWidth
            required
            value={user.firstname}
            onChange={changeHandler}
            variant="outlined"
            name="firstname"
            id="outlined-basic"
            label="firstname"
            {...(errors.firstname && {
              error: true,
              helperText: errors.firstname,
            })}
          />
        </Grid2>

        <Grid2 item xs={12} md={12} sm={7}>
          <TextField
            fullWidth
            xs={12}
            md={12}
            value={user.email}
            onChange={changeHandler}
            variant="outlined"
            name="email"
            label="email"
            {...(errors.email && {
              error: true,
              helperText: errors.email,
            })}
          />
        </Grid2>

        <Grid2 item xs={12} md={6} sm={7}>
          <TextField
            fullWidth
            required
            value={user.password}
            onChange={changeHandler}
            variant="outlined"
            name="password"
            label="password"
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
          />
        </Grid2>
        <Grid2 item xs={12} md={6} sm={7}>
          <TextField
            fullWidth
            required
            value={user.confirm_password}
            onChange={changeHandler}
            variant="outlined"
            name="confirm_password"
            label="confirm_password"
            {...(errors.confirm_password && {
              error: true,
              helperText: errors.confirm_password,
            })}
          />
        </Grid2>
        <Button
          style={{
            width: "30%",
            margin: "2rem auto",
            backgroundColor: "black",
            color: "white",
            fontSize: "1rem",
          }}
          onClick={onsubmit}
        >
          Submit
        </Button>
      </Grid2>
    </Grid2>
  );
}

export default Register;
