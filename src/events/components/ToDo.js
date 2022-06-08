import React from "react";

const ToDo = ({ todo, handleToggle }) => {
  const handleClick = (e) => {
    e.preventDefault();
    handleToggle(e.currentTarget.id);
  };
  return (
    <div
      id={todo.id}
      key={todo.id + todo.activitate}
      name="todo"
      value={todo.id}
      onClick={handleClick}
      className={todo.complete ? "todo strike" : "todo"}
    >
      {todo.activitate}
    </div>
  );
};

export default ToDo;
