import { Button } from '@mui/material';
import axios from 'axios';

import React from 'react';






const recordPerPage=5;
export const Pagination = ({todoItems,changeTodoItems,totalCount,changeTotalCount,currentPage,changeCurrentPage}) => {
 
  if(todoItems.length<1) {
    return null;
  }
 const pageNumbers=[];
 const numberOfPages=Math.ceil(totalCount/recordPerPage);
 for(let pageNum=1;pageNum<=numberOfPages;pageNum++) {
  pageNumbers.push(pageNum);
 }

 const fetchPaginatedItemsByPageNumber=(pageNum)=>{
    axios.get(`http://localhost:5000/api/v1/todos/?page=${pageNum}`)
    .then(resp=>{
        const {todoitems,total}=resp.data;
        changeTodoItems(todoitems);
        changeTotalCount(total);
        changeCurrentPage(pageNum);
       
    })
    .catch(err=>{
      alert(err);
    })
 }

 const goToPreviousPage=()=>{
  if(currentPage===1) {return}
   fetchPaginatedItemsByPageNumber(currentPage-1);
 }

 const goToTextPage=()=>{
  if(currentPage===numberOfPages) {return}
  fetchPaginatedItemsByPageNumber(currentPage+1);
 }
  
  return (
    <ul className="paginatedButtons">
    <Button color="secondary" variant="contained" onClick={goToPreviousPage}>previous</Button>
    {pageNumbers.map(pageNumber=>{
      return <li onClick={()=>fetchPaginatedItemsByPageNumber(pageNumber)} className={`${pageNumber===currentPage?"active":""}`} key={pageNumber}>{pageNumber}</li>
    })}
    <Button color="secondary" variant="contained" onClick={goToTextPage}>next</Button>
    </ul>
  )
}
