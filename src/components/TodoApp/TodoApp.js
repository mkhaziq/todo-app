import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const localTodo = JSON.parse(temp);

    if (localTodo) {
      setTodos(localTodo);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const handleSubmit = () => {
    const newTodo = {
      id: new Date().getTime(),
      name: todo,
    };
    if (newTodo.name !== "") setTodos([...todos, newTodo]);

    setTodo("");
  };

  const deleteTodo = (id) => {
    const newTodo = [...todos].filter((item) => item.id !== id);
    setTodos(newTodo);
  };

  const edit = (id) => {
    const updatedTodo = [...todos].map((item) => {
      if (item.id === id) {
        item.name = editText;
      }
      return item;
    });
    setTodos(updatedTodo);
    setEditTodo(null);
    setEditText("");
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
      p={10}
    >
      <Paper
        sx={{
          width: "300px",
          p: 5,
          backgroundColor: "#c40306",
          mt: 10,
        }}
        elevation={10}
      >
        <Typography mt={2} variant="h4">
          TODO APP
        </Typography>
        {!editTodo && (
          <form onSubmit={(e) => e.preventDefault()}>
            <Box mt={4}>
              <TextField
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                variant="standard"
                label="Enter Todo Item"
                color="warning"
                focused
              />
              <IconButton
                sx={{ color: "white", backgroundColor: "black" }}
                onClick={handleSubmit}
              >
                <AddOutlinedIcon fontSize="medium" />
              </IconButton>
            </Box>
          </form>
        )}

        {todos.map((item) => {
          return (
            <div key={item.id}>
              {editTodo === item.id ? (
                <>
                  <Box mt={2}>
                    <TextField
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      variant="standard"
                      label="Enter New Text"
                      color="warning"
                      focused
                    />
                    <IconButton
                      sx={{ color: "white", backgroundColor: "black" }}
                      onClick={() => edit(item.id)}
                    >
                      <DoneOutlinedIcon fontSize="medium" />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <Paper
                  sx={{
                    mt: 3,
                    p: 1,
                    textTransform: "uppercase",
                  }}
                  elevation={10}
                >
                  {item.name !== "" && (
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item lg={8} md={8} xs={8}>
                        <Typography variant="h6">{item.name}</Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          color="success"
                          onClick={() => setEditTodo(item.id)}
                          sx={{ backgroundColor: "black" }}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red", backgroundColor: "black", ml: 1 }}
                          onClick={() => deleteTodo(item.id)}
                        >
                          <DeleteForeverOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  )}
                </Paper>
              )}
            </div>
          );
        })}
      </Paper>
    </Box>
  );
};

export default TodoApp;
