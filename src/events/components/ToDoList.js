import React from "react";
import Button from "../../shared/components/FormElements/Button";
import ToDo from './ToDo';
 
 
const ToDoList = ({toDoList,handleFilter,handleToggle}) => {
   return (
       <div>
           {toDoList.map(todo => {
               return (
                <ToDo todo={todo} handleToggle={handleToggle} handleFilter={handleFilter}/>
               )
           })}
            <Button style={{margin: '20px'}} onClick={handleFilter}>Clear Completed</Button>
       </div>
   );
};
 
export default ToDoList;