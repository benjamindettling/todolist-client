import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

const App = () => {
  return (
    <main className="main">
      <section className="section container">
        <h1 className="heading-xl text-center">PERN Todo List</h1>
        <InputTodo />
        <ListTodos />
      </section>
    </main>
  );
};

export default App;
