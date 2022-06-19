import axios from 'axios';
import React,{useState} from 'react'
import { Button, TextField } from '@mui/material';

export const EditedTodo = ({item,todoItems,changeTodoItems}) => {
    const [inputValue,setInputValue]=useState(item.name);

    const saveUpdatedTodoItem=()=>{
        if(inputValue===""||inputValue.trim().length===0) {
            alert("no input!");
            return;
        }
        axios.patch(`http://localhost:5000/api/v1/todos/${item._id}`,{name:inputValue,edit:false})
        .then(()=>{
            const updatedItems=todoItems.map(todo=>{
                if(todo._id===item._id) {
                    todo.name=inputValue;
                    todo.edit=false;
                }
                return todo;

            })
            changeTodoItems(updatedItems)
        })
        .catch(err=>{
            alert(err);
        })
    }
    const cancelUpdatedChangesForTodoItem=()=>{
        axios.patch(`http://localhost:5000/api/v1/todos/${item._id}`,{edit:false})
        .then(()=>{
            const updatedItems=todoItems.map(todo=>{
                if(todo._id===item._id) {
                    todo.name=item.name;
                    todo.edit=false;
                }
                return todo;
            })
            changeTodoItems(updatedItems);
        })
        .catch(err=>{
            alert(err);
        })
        
    }

  return (
    <div>
        <TextField color="secondary" size="small" type="text" value={inputValue} onChange={e=>setInputValue(e.target.value)}/>
        <Button color="success" variant="contained" onClick={saveUpdatedTodoItem}>save</Button>
        <Button color="error" variant="outlined" onClick={cancelUpdatedChangesForTodoItem}>cancel</Button>
    </div>
  )
}




