import React from 'react'
import { SingleToDoItem } from './SingleToDoItem';
import {NoItems} from "./NoItems";

export const TodoItemsContainer = ({todoItems,changeTodoItems,totalCount,changeTotalCount,currentPage,changeCurrentPage}) => {
  if(todoItems.length<1) {
    return <NoItems/>
  }

  
  
  return (
    <div className="itemContainer">
        {todoItems.map(item=>{
            return <SingleToDoItem key={item._id} item={item} todoItems={todoItems} changeTodoItems={changeTodoItems} changeTotalCount={changeTotalCount} currentPage={currentPage} changeCurrentPage={changeCurrentPage}/>
        })}
    </div>
  )
}


