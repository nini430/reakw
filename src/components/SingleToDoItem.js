import React from 'react'
import axios from "axios";
import { EditedTodo } from './EditedTodo';
import { Checkbox, Grid, IconButton,Item } from '@mui/material';
import {Edit,Delete} from "@mui/icons-material";




const recordPerPage=5;
export const SingleToDoItem = ({item,todoItems,changeTodoItems,changeTotalCount,currentPage,changeCurrentPage}) => {
    if(item.edit) {
        return <EditedTodo item={item} todoItems={todoItems} changeTodoItems={changeTodoItems}/>
    }
    const deleteTodoItemById=()=>{
       axios.delete(`http://localhost:5000/api/v1/todos/${item._id}`)
       .then(response=>{
        
        const {todoItems, totalRecordsCount}=response.data;
        const pageNumbers=Math.ceil(totalRecordsCount/recordPerPage);
        const visitedItems=pageNumbers*recordPerPage;
        const paginatedItems=todoItems.slice(visitedItems-recordPerPage,visitedItems);
        
      if(currentPage===pageNumbers||paginatedItems.length===5) {
        changeTodoItems(paginatedItems);
        changeTotalCount(totalRecordsCount);
        changeCurrentPage(pageNumbers);

      }else{
        const paginatedItems=todoItems.slice((currentPage*recordPerPage)-5,currentPage*recordPerPage);
        changeTodoItems(paginatedItems);
      }
       
       })
       .catch(err=>{
        alert(err);
       })
        
    }
    const switchItemToEditMode=()=>{
        axios.patch(`http://localhost:5000/api/v1/todos/${item._id}`,{edit:true})
        .then(()=>{
           const updatedItems=todoItems.map(todo=>{
            if(todo._id===item._id) {
                todo.edit=true;
            }
            return todo;
           })
           changeTodoItems(updatedItems);
        })
        .catch(err=>{
            alert(err);
        })
        
    }

    const toggleCompletionForTodoItem=()=>{
        axios.patch(`http://localhost:5000/api/v1/todos/${item._id}`,{completed:!item.completed})
        .then(()=>{
            const updatedItems=todoItems.map(todo=>{
                if(todo._id===item._id) {
                    todo.completed=!todo.completed;
                    
                    
                    
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
    <div className="size-const">
    <Grid container spacing={2} justifyContent="center">
        <Grid item xs={1}>

            <Checkbox  checked={item.completed?true:false} color="secondary"  onClick={()=>toggleCompletionForTodoItem()} type="checkbox"/>
            
        </Grid>
        <Grid item xs={3} className={`${item.completed?"line-through overflow":"overflow"}`} >
           <span >{item.name}</span>
        </Grid>
        <Grid item xs={1}>
            <IconButton onClick={switchItemToEditMode}><Edit/></IconButton>
        </Grid>
         <Grid item xs={1}>
            <IconButton color="error" onClick={deleteTodoItemById}><Delete/></IconButton>
        </Grid>
        
        
    </Grid>
    </div>
  
  )
}
