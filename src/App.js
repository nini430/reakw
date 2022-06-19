import React,{useState,useEffect} from "react";
import axios from "axios";
import './App.css';
import { TodoItemsContainer } from "./components/TodoItemsContainer";
import { ToDoInputContainer } from "./components/ToDoInputContainer";
import { Pagination } from "./components/Pagination";
import {Typography} from "@mui/material";
import { Loading } from "./components/Loading";





function App() {
  const [loading,setLoading]=useState(false)
  const [todoItems,setTodoItems]=useState([]);
  const [totalCount,setTotalCount]=useState(0);
  const [todoInput,setToDoInput]=useState("");
  const [currentPage,setCurrentPage]=useState(1);
  
  useEffect(()=>{
    const fetchData=async()=>{
        setLoading(true);
        const response=await  axios.get(`http://localhost:5000/api/v1/todos/?page=1`)
        setTodoItems(response.data.todoitems);
        setTotalCount(response.data.total)
        setLoading(false);
    }
    fetchData();
   
    
  },[])

if(loading) {
  return <Loading/>
}

  return (
    <div className="App">
      <header>
      <Typography variant="h2">To do List </Typography>
      </header>
      <ToDoInputContainer todoInput={todoInput} changeTodoInput={setToDoInput} todoItems={todoItems} changeTodoItems={setTodoItems} totalCount={totalCount} changeTotalCount={setTotalCount} currentPage={currentPage} changeCurrentPage={setCurrentPage} />
      <TodoItemsContainer todoItems={todoItems} changeTodoItems={setTodoItems} totalCount={totalCount} changeTotalCount={setTotalCount} currentPage={currentPage} changeCurrentPage={setCurrentPage} />
     <Pagination todoItems={todoItems} changeTodoItems={setTodoItems} totalCount={totalCount} changeTotalCount={setTotalCount} currentPage={currentPage} changeCurrentPage={setCurrentPage}/>

    </div>
  );
}

export default App;
