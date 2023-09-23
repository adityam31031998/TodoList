import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/App.css";

const TodoList = () => {
  const [todoText, setTodoText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const handleTodoTextChange = (e) => {
    setTodoText(e.target.value);
  };
  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && todoText.trim() !== "") {
      const newTask = { text: todoText, completed: false };
      setTasks([...tasks, newTask]);
      setTodoText("");
    }
  };
  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };
  const updateFilter = (selected) => {
    setSelectedFilter(selected);
  };
  const filteredTasks =
    selectedFilter === "completed"
      ? tasks.filter((task) => task.completed)
      : selectedFilter === "active"
      ? tasks.filter((task) => !task.completed)
      : tasks;

  return (
    <Grid className="bg" container>
      <div
        style={{ position: "relative", top: "20%", left: "10%", width: "70vw" }}
      >
        <Grid item xs={6}>
          <h1 className="title">T O D O</h1>
        </Grid>
        <Grid item xs={9}>
          <TextField
            className="inputStyle"
            style={{ backgroundColor: "white", borderRadius: "4px" }}
            placeholder="Create a new todo..."
            fullWidth
            value={todoText}
            onChange={handleTodoTextChange}
            onKeyDown={handleInputKeyPress}
          />
        </Grid>
        <br />
        <Grid item xs={9} className="outer-shadow">
          <div style={{ backgroundColor: "white" }}>
            <FormControl component="fieldset">
              {filteredTasks.map((task, index) => (
                <div key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    }
                    label={task.completed ? <del>{task.text}</del> : task.text}
                  />
                  <IconButton onClick={() => handleDeleteTask(index)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}
            </FormControl>
          </div>
          <div
            style={{
              backgroundColor: "white",
              fontSize: "15px",
              display: "flex",
            }}
          >
            <p style={{ margin: "30px" }}>{filteredTasks.length} Items left</p>
            <div
              style={{
                userSelect: "none",
                display: "flex",
                gap: "80%",
              }}
            >
              <p onClick={() => updateFilter("all")}>All</p>
              <p onClick={() => updateFilter("active")}>Active</p>
              <p onClick={() => updateFilter("completed")}>Completed</p>
              <p onClick={clearCompleted}>Clear Completed</p>
            </div>
          </div>
        </Grid>
      </div>
    </Grid>
  );
};

export default TodoList;
