import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


export default function Fetchdata() {
  const [data, setData] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');

  useEffect(() => {
    axios.get('https://dummyjson.com/todos').then((res) => {
      setData(res.data.todos);
    });
  }, []);

  const handleAddTodo = () => {
    //  create a new todo
    const newTodoObj = { todo: newTodo, completed: false, userId: 1 };
    setData([...data, newTodoObj]);
    setNewTodo('');
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setEditedTodo(todo.todo);
  };

  const handleSaveEditedTodo = () => {
    // update the edited todo
    const updatedTodos = data.map((todo) =>
      todo.id === editingTodo.id ? { ...todo, todo: editedTodo } : todo
    );
    setData(updatedTodos);
    setEditingTodo(null);
    setEditedTodo('');
  };

  const handleDeleteTodo = (todoId) => {
    // delete the todo
    const updatedTodos = data.filter((todo) => todo.id !== todoId);
    setData(updatedTodos);
  };

  const handleToggleCompleted = (todo) => {
    const updatedTodos = data.map((t) =>
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    );
    setData(updatedTodos);
  };

  return (
    <div>
        <Box sx={{marginLeft:15,marginTop:5}}>
        <Stack direction="row" spacing={2}>
        <TextField
          label="Add New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={handleAddTodo} variant="contained" color="primary">
          Add
        </Button>
        </Stack>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>TO-DO</TableCell>
              <TableCell>COMPLETED</TableCell>
              <TableCell>USERID</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((todo) => (
              <TableRow key={todo.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{todo.id}</TableCell>
                <TableCell>
                  {editingTodo && editingTodo.id === todo.id ? (
                    <TextField
                      value={editedTodo}
                      onChange={(e) => setEditedTodo(e.target.value)}
                    />
                  ) : (
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.todo}
                  </span>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleToggleCompleted(todo)}>
                    {todo.completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>{todo.userId}</TableCell>
                <TableCell>
                  {editingTodo && editingTodo.id === todo.id ? (
                    <>
                      <Button onClick={handleSaveEditedTodo} variant="contained" color="primary">
                        Save
                      </Button>
                      <Button onClick={() => setEditingTodo(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditTodo(todo)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  );
}