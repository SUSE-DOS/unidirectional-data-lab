import React, { useState } from "react";
import TodoContainer from "../components/TodoContainer";
import HeaderContainer from "../components/HeaderContainer";
import ArchivedContainer from "../components/ArchivedContainer";

function TodoScreen() {
  const [title, setTitle] = useState("Todo List");
  const handleSwitch = (title) => {
    setTitle(title);
  };

  return (
    <>
      <HeaderContainer title={title} />
      {title === "Todo List" ? (
        <TodoContainer switch={handleSwitch} />
      ) : (
        <ArchivedContainer switch={handleSwitch} />
      )}
    </>
  );
}

export default TodoScreen;
