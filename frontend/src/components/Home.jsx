import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
// import { useParams } from "react-router-dom";

function Home() {
  // const { id } = useParams();
  // const [idd, setIdd] = useState();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/task/");
      // console.log(data);
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTodoAdded = () => {
    fetchData(); // Refresh todo list after adding a new todo
  };

  const deleteHandler = async (id) => {
    // console.log(id);
    await axios.delete(`http://localhost:5000/api/task/${id}`);
    fetchData(); // instead of calling fetch again, force reload
    // location.reload(true); //not as smoot
  };

  const handleCheckbox = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>Todo List</h2>
        <Create onTodoAdded={handleTodoAdded} />

        {todos.length === 0 ? (
          <div>
            <h2>No Records</h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              onDoubleClick={() => deleteHandler(todo._id)}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 5,
                // // displayDirection: "column", // justifyContent: "space-between",
                // // justifyContent: "",
                // // justifySelf: "center",
                // // alignContent: "center",
                width: 250,
                backgroundColor: "black",
                color: "white",
                // // padding: "2 5 2 5",
                // // justifyItems: "center",
                marginTop: 3,
                // marginLeft: 250,
              }}
            >
              <input
                type="checkbox"
                // checked={todo.isChecked || false} //initial method
                checked={todo.isChecked}
                onChange={() => handleCheckbox(todo._id)}
                name="todo"
                value={todo}
                style={{
                  marginRight: 10,
                }}
              />
              <div
                style={{ textDecoration: todo.isChecked ? "line-through" : "" }}
              >
                {todo.task}
                {/* {todo.isChecked ? <strike>{todo.task}</strike> : todo.task} */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
