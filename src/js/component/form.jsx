// Strategy: 
// 1. We need to get the information from another computer (server). -> We use fetch to get this information.
// 2. Using fetch, we get a response object from the server.
// 3. The response can be successful or an error. We need to decide what to do on each case. 
// 4. If we get a sucessful response, we process the data from the server and we tried to displayed in the component.
// 5. If we get an error from the server, we process process the error displaying a console.log.

import React, { useState, useEffect } from "react";

const Form = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // GET request
    fetch("https://playground.4geeks.com/apis/fake/todos/user/connectmgaur")
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

    // POST request
    fetch("https://playground.4geeks.com/apis/fake/todos/user/connectmgaur", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        []
      ),
    })
    .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the form from submitting and refreshing the page
    if (todo.trim() !== "") {
      setTodos([...todos, { label: todo }]); // Spread operator used to create a new array with the existing todos
      setTodo("");
    }
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };
  return (
    <div className="wrapper">
     <div className="row">
        <div className="container col-sm-8">

      <h1>Todos</h1>

      <form className="TodoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="todo-input"
          placeholder="What is the task today?"
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </div>

      <ul className="List">
        {todos.map((item, index) => (
          <li key={index}>
            <label>{item.label}</label>
            <p>{item.id}</p>
            <button className="btn-delete" onClick={() => handleDelete(index)}>
              <span>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div>{todos.length}</div>
    </div>
    </div>
  );
};

export default Form;