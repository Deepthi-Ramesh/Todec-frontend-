const { Button } = require("@mui/material");
import { useNavigate } from "react-router-dom";
import "../../App.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
function Home() {
  const history = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "200vh",
        backgroundColor: " hsl(235, 24%, 19%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div style={{ marginTop: "10rem" }}>
        <div className="app_title">
          <p>TODEC...</p>
        </div>

        <div className="animated-text ">
          <h1>Where task management meets simplicity.</h1>
        </div>
      </div>
      <div className="scroll_up">
        <ArrowUpwardIcon
          style={{ color: "white", width: "5rem", height: "5rem" }}
        />
        <p style={{ fontSize: "1rem", color: "white", width: "20%," }}>
          Scroll up
        </p>
      </div>
      <div
        style={{
          marginTop: "8rem",
          width: "100%",
          height: "70vh",
          border: "1px solid white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "white", fontSize: "2.5rem" }}>
          To experience the easier task management app , start here{" "}
        </p>
        <div
          style={{
            width: "20%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Button
            style={{ backgroundColor: "white", color: "black" }}
            onClick={() => {
              history("/register");
            }}
          >
            Register
          </Button>
          <Button
            style={{ backgroundColor: "white", color: "black" }}
            onClick={() => {
              history("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Home;
