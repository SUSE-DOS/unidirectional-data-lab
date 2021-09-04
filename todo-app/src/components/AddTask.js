import React, { useRef } from "react";

function AddTask(props) {
  // refs for input text value
  const titleRef = useRef(null);
  const descRef = useRef(null);

  // handle button click
  const add = () => {
    props.addTask(titleRef.current.value, descRef.current.value);
  };

  // return JSX
  return (
    <>
      <input ref={titleRef} type="text" placeholder="Title" />
      <input ref={descRef} type="text" placeholder="Description" />
      <button onClick={add}>Add</button>
    </>
  );
}

export default AddTask;
