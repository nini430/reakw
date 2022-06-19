import React from 'react';
import axios from "axios";
import {TextField,IconButton} from "@mui/material";
import {Add} from "@mui/icons-material"


const recordPerPage=5;
export const ToDoInputContainer = ({todoInput,changeTodoInput,todoItems,changeTodoItems,totalCount,changeTotalCount,currentPage,changeCurrentPage}) => {
    const changeTodoInputHandler=e=>changeTodoInput(e.target.value);
    const submitTodoInputHandler=(e)=>{
        e.preventDefault();
        if(todoInput===""||todoInput.trim().length===0) {
            alert("no input!")
            return;
        }
        axios.post('http://localhost:5000/api/v1/todos',{name:todoInput})
        .then(resp=>{
            const {todoItems, totalRecordsCount}=resp.data;
            const page=Math.ceil(totalRecordsCount/recordPerPage);
            const pagesVisited=page*recordPerPage;
            const paginatedItems=todoItems.slice(pagesVisited-recordPerPage,pagesVisited)
            changeTodoItems(paginatedItems);
            changeTotalCount(totalRecordsCount);
            changeTodoInput("");
                changeCurrentPage(page);
        })
        .catch(err=>{
            alert(err)
        })

        
    }
  return (
    <form className="form-control">
        <TextField label='type your todo here' variant="outlined" size="small" color="secondary" type="text"  value={todoInput} onChange={changeTodoInputHandler}/>
        <IconButton color="secondary" size="large" type="submit" onClick={submitTodoInputHandler} ><Add/></IconButton>
    </form>
  )
}
