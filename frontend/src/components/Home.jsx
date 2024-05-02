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
    fetchData();
  };

  const handleCheckbox = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  return (
    <div>
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
              justifyContent: "center",
              margin: 10,
            }}
          >
            <div>
              <p>{todo.isChecked}</p>
            </div>
            <input
              type="checkbox"
              checked={todo.isChecked || false}
              onChange={() => handleCheckbox(todo._id)}
              name="todo"
              value={todo}
              style={{
                marginRight: 10,
              }}
            />
            <div>
              {todo.isChecked ? (
                <strike>{todo.task}</strike>
              ) : (
                <p>{todo.task}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
