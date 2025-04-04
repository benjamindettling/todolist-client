import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import { useState } from "react";

const App = () => {
  const [todoCount, setTodoCount] = useState(0);

  return (
    <>
      <InputTodo todoCount={todoCount} />
      <ListTodos onTodoCountChange={setTodoCount} />
    </>
  );
};

export default App;
