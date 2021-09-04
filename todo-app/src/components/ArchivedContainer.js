import React from "react";

function ArchivedContainer(props) {
  const handleSwitch = () => {
    props.switch("Todo List");
  };

  return (
    <>
      <div>This is archived container</div>
      <div>
        <button onClick={handleSwitch}>View Todo List</button>
      </div>
    </>
  );
}

export default ArchivedContainer;
