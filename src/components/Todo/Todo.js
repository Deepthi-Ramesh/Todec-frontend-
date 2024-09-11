import "../../../src/App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { HOST_URL } from "../../Constants";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Todo() {
  const [isReloadTodos, setIsReloadTodos] = useState(true);
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const { userid } = useParams();
  useEffect(() => {
    if (isReloadTodos) {
      getAllTodos();
      setIsReloadTodos(false);
    }
  }, [isReloadTodos]);

  const submit = async () => {
    try {
      var sendTodo = todo;
      settodo("");
      if (sendTodo.length <= 255 && sendTodo.length != 0) {
        const response = await axios.post(`${HOST_URL}/addtodo/${userid}`, {
          todo: sendTodo,
        });
      
     
        setIsReloadTodos(!isReloadTodos);
      } else {
        alert("Todo cannot be too long and also cannot be empty");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async (id) => {
    console.log(id);
    try {
      const response = await axios.post(`${HOST_URL}/deleteTodo/${userid}`, {
        id: id,
      });
      setIsReloadTodos(true);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllTodos = async () => {
    try {
      const response = await axios.get(`${HOST_URL}/todos/${userid}`);
      settodos(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const completedTodo = async (id) => {
    console.log("id : ", id);
    try {
      const response = await axios.put(`${HOST_URL}/completedTodo/${userid}`, {
        id: id,
      });
      setIsReloadTodos(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <div className="main-container">
        <div className="container1">
          <h3>TODO</h3>
          <div className="subcon">
            <input
              type="text"
              onChange={(e) => settodo(e.target.value)}
              placeholder="Create a New TODO"
              value={todo}
              id="input"
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
            {/* <button id="addbtn"onClick={submit}>Add Todo</button> */}
          </div>
        </div>
        <div className="container2">
          <div className="subcon2">
            {todos?.length > 0
              ? todos.map((element) =>
                  (activeFilter === "active" && element.is_completed === 0) ||
                  (activeFilter === "complete" && element.is_completed === 1) ||
                  activeFilter === "all" ? (
                    <div key={element.todo_pk} className="eachtodo">
                      <div id="striketodo">
                        <input
                          type="checkbox"
                           id='radio'
                          checked={element.is_completed === 1}
                          onChange={() => completedTodo(element.todo_pk)}
                        />
                        <p
                          className={
                            element.is_completed === 1 ? "line-through" : ""
                          }
                        >
                          {element.todo_title}
                        </p>
                      </div>
                      <button
                        id="delete"
                        onClick={() => deleteTodo(element.todo_pk)}
                      >
                        X
                      </button>
                    </div>
                  ) : null
                )
              : null}

            <div className="todosummary">
              {todos?.length} items left
              <div className="stages">
                <p
                  style={{ color: activeFilter === "all" ? "blue" : "inherit" }}
                  onClick={() => setActiveFilter("all")}
                >
                  All
                </p>
                <p
                  style={{
                    color: activeFilter === "active" ? "blue" : "inherit",
                  }}
                  onClick={() => setActiveFilter("active")}
                >
                  Active
                </p>
                <p
                  style={{
                    color: activeFilter === "complete" ? "blue" : "inherit",
                  }}
                  onClick={() => setActiveFilter("complete")}
                >
                  Completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
