import React, { useState } from "react";
import axios from "axios";

function Create({ onTodoAdded }) {
  const [task, setTask] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (task === "") {
        return;
      }

      await axios.post("/api/task/add/", {
        task,
      });
      setTask("");
      onTodoAdded(); //will be used to update the tasks list from the server
      // console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
        value={task}
        style={{ marginBottom: 5 }}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
