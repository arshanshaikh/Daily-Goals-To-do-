import React, { useEffect, useState } from "react";
import Task from "./Task";

function Home() {
  const intialArray = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  const [tasks, setTasks] = useState(intialArray);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault(); //it will stop the page reloding behaviour
    setTasks([...tasks, { title, description }]); ///task ke baad it will add title and description
    setTitle("");//it will make the space empty to write.same for the below
    setDescription("");
  };

  // ----------------Deleting an element from the Goals-----------------------------------------------------------------

  const deleteTask = (index) => {
    const filteredArr = tasks.filter((val, i) => {
      return i !== index; //jab delete karegae to wo index delete kardega or baki sab raklega
    });

    // console.log(filteredArr);//for the console
    setTasks(filteredArr); //for the UI to actually delete the element
  };

  // --- ---------------------------for local storage------------------
  useEffect(() =>{

    localStorage.setItem("tasks",JSON.stringify(tasks));

  },[tasks]);

  return (
    <div className="container">
      <h1>Daily Goals</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="Submit">ADD</button>
      </form>

      {tasks.map((item, index) => (
        <Task
          key={index}
          title={item.title}
          description={item.description} //it will add that in to the list before this item code it is only added inthe console not on the UI
          deleteTask={deleteTask}
          index={index}
        />
      ))}
    </div>
  );
}

export default Home;
