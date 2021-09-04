import React, { useState, useEffect } from "react";
import Task from "./Task";
import AddTask from "./AddTask";

function TodoContainer(props) {
  // State initialization
  const defaultTasks = [];
  const [tasks, setTasks] = useState(defaultTasks);
  const [noOfSec, setNoOfSec] = useState(0);
  const [addTaskCounter, setAddTaskcounter] = useState(0);
  const [archivedTasks, setArchivedTasks] = useState([]);
  // Effects
  // useEffect(() => {
  //   console.log("run on mount");

  //   return () => {
  //     console.log("run on unmount");
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("run on mount and every re-render");
  // });

  /*
    This effect ensures there is only one instance of interval at each time.
    It listens to `noOfSec` and execute every second to increment its value by 1.
  */
  useEffect(() => {
    const intervalInstance = setInterval(() => {
      setNoOfSec(noOfSec + 1);
    }, 1000);

    return () => {
      clearInterval(intervalInstance);
    };
  }, [noOfSec]);

  /*
    This effect reset the idle counter when there is any changes made to the state`- addTaskCounter`.
  */
  useEffect(() => {
    setNoOfSec(0);
  }, [addTaskCounter]);

  // Fetch task lists on mount
  useEffect(() => {
    fetch("/defaultTasks.json").then((res) => {
      res.json().then((tasks) => {
        setTasks(tasks);
      });
    });
  }, []);

  // Functions
  const handleToggleDone = (taskId, isDone) => {
    console.log("fire");
    const completedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        t.isDone = !isDone;
      }
      return t;
    });

    setTasks(completedTasks);
  };

  const handleAddTask = (title, desc) => {
    const id = tasks[tasks.length - 1].id + 1;
    console.log("id", id);
    setTasks(
      tasks.concat([
        {
          id,
          title,
          description: desc,
          isDone: false,
        },
      ])
    );
    setAddTaskcounter(addTaskCounter + 1);
  };

  const removeCompletedTasks = () => {
    if (tasks.length === 0) {
      window.alert("No tasks to remove");
      return;
    }
    setArchivedTasks(
      archivedTasks.concat(tasks.filter((t) => t.isDone === true))
    );
    setTasks(tasks.filter((t) => t.isDone === false));
  };

  const handleSwitch = () => {
    props.switch("Archived");
  };

  // JSX
  return (
    <div id="todo-container">
      <ul>
        {tasks.map((t) => (
          <Task key={t.id} task={t} toggleDone={handleToggleDone} />
        ))}
      </ul>
      <button onClick={removeCompletedTasks}>Remove Completed</button>
      <div>Count: {tasks.length}</div>
      <div>{noOfSec} seconds since new task is added.</div>
      <div>Archived: {archivedTasks.length}</div>
      <AddTask addTask={handleAddTask} />
      <div>
        <button onClick={handleSwitch}>View Archived</button>
      </div>
    </div>
  );
}

export default TodoContainer;
