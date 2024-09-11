import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid2, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { HOST_URL } from "../../Constants";
function Login() {
  const history = useNavigate();
  const [errors, setErrors] = useState({});
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = (fieldValues = user) => {
    let temp = { ...errors };

    if ("email" in fieldValues) {
      temp.email = fieldValues.email === "" ? "Email is required" : "";
    }
    if ("password" in fieldValues) {
      temp.password = fieldValues.password === "" ? "password is required" : "";
    }
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const onsubmit = async (e) => {
    if (validate()) {
      try {
        const response = await axios.post(`${HOST_URL}/login`, {
          User: user,
        });

        if (response.status == 200) {
          var id = response.data.data[0].user_pk;

          console.log("Logged in ");

          history(`/user/${id}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(errors);
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
        xs={9}
        md={4}
        spacing={3}
        direction="column"
        width={"27%"}
        style={{
          border: "3px solid orange",
          padding: "1rem 0",
          backgroundColor: "#e8e7e6",
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid2 item xs={12} style={{ textAlign: "center", color: "black" }}>
          <h2>LOGIN</h2>
        </Grid2>
        <Grid2 item xs={12} md={12}  style={{width:'65%'}}>
          <TextField
            fullWidth
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

        <Grid2 item xs={8} md={9} style={{width:'65%'}}>
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

export default Login;
