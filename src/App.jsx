import MakeTodo from "./component/createTodo";
import AllList from "./component/allTodos";

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <MakeTodo />
      {/* <AllList /> */}
    </div>
  );
}

export default App;
