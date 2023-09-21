import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

const Details = () => {
  const [todoText, setTodoText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectRadio, setSelectRadio] = useState(-1);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTodoTextChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && todoText.trim() !== "") {
      setTasks([...tasks, { text: todoText }]);
      setTodoText("");
    }
  };

  const handleRadioChange = (index) => {
    setSelectRadio(index);
    setErrorMessage("");
  };

  const handleDeleteTask = (index) => {
    if (selectRadio === -1) {
      setErrorMessage("Please select a task to delete.");
    } else {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
      setSelectRadio(-1);
    }
  };

  return (
    <Grid className="bgimage" container>
      <div
        style={{ position: "relative", top: "20%", left: "15%", width: "70vw" }}
      >
        <Grid item xs={6}>
          <h2 style={{ color: "black" }}>T O D O</h2>
        </Grid>
        <Grid item xs={7}>
          <TextField
            style={{ backgroundColor: "white", borderRadius: "4px" }}
            variant="outlined"
            placeholder="Enter task to add."
            fullWidth
            value={todoText}
            onChange={handleTodoTextChange}
            onKeyDown={handleInputKeyPress}
          />
        </Grid>
        <br />
        <Grid item xs={7} className="outer-shadow">
          <div style={{ backgroundColor: "white" }}>
            {tasks.length===0 ? (
              <FormControl component="fieldset">
                <p>Task not found Please Enter new task</p>
              </FormControl>
            ) : (
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="tasks"
                  name="tasks"
                  value={selectRadio}
                  onChange={(e) => handleRadioChange(Number(e.target.value))}
                >
                  {tasks.map((task, index) => (
                    <div style={{ background: "none" }} key={index}>
                      <FormControlLabel
                        value={index}
                        control={<Radio />}
                        label={task.text}
                      />
                      <IconButton onClick={() => handleDeleteTask(index)}>
                        <CloseIcon />
                      </IconButton>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          </div>
          <div style={{ backgroundColor: "white", fontSize: "15px" }}>
            <p>{tasks.length} Items left</p>
          </div>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Grid>
      </div>
    </Grid>
  );
};

export default Details;
