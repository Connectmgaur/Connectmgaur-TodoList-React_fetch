
import React, { useState, useEffect } from "react";

const Form =()=>{

  const [todo,setTodo]=useState('');
  const [todos,setTodos]=useState([]);

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/connectmgaur')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          console.log("Received data is not an array:", data);
                    // You can handle this scenario by setting an appropriate default value for todos
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the form from submitting and refreshing the page
    if (todo.trim() !== '') {
      setTodos([...todos, todo]);//spread operator... This syntax is used in the setTodos function to create a new array that includes all the existing todos
      setTodo("");

    }
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

 
return (
<div className="container d-flex">
  <h1>Todos</h1>
   
<form className="TodoForm" onSubmit={handleSubmit}>
 <input type="text" value={todo} onChange={(e)=> setTodo(e.target.value)} className="todo-input" placeholder="What is the task today?"/>
  
  <button type="submit" className="btn btn-primary">Submit</button>

  </form>
  <ul className="List">
        {todos.map((item, index) => (
          <li key={index}>
            <label>{item.label}</label>
            <p>{item.id}</p>
           <button className="btn-delete" onClick={() => handleDelete(index)}>
            <span>
            <i class="fa fa-times" aria-hidden="true"></i></span>
      
            </button>
          </li>
          
        ))}
        
      </ul>
      <div>{todos.length}</div>
    </div>
  );
};
        

export default Form;
