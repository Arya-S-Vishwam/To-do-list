import React, { useState, useEffect } from "react";

function App() {
  // State to store tasks and user input
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);  // Keeps track of which task is being edited
  const [editingText, setEditingText] = useState("");      // Holds the updated text for editing

  // Save tasks to localStorage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle adding a new task or updating an existing task
  const handleSubmit = () => {
    if (input.trim() !== "") {
      if (editingIndex !== null) {
        // Update the task if we're in edit mode
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex].text = input; // Update the task text with the new input
        setTasks(updatedTasks);
        setEditingIndex(null); // Reset editing state
        setInput(""); // Clear the input field
      } else {
        // Add a new task if no task is being edited
        setTasks([...tasks, { text: input, completed: false }]);
        setInput(""); // Clear input field
      }
    }
  };

  // Toggle task completion
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Edit a task
  const editTask = (index) => {
    setEditingIndex(index); // Set the task to edit
    setInput(tasks[index].text); // Pre-fill the input field with the current task text
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundImage:'url(data:image/jpeg;base64,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)',
       
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "#fff",
      }}
    >
      <h1>To-Do List</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add or Edit a task..."
          style={{
            padding: "10px",
            width: "60%",
            marginRight: "10px",
            borderRadius: "4px",
            
            border: "1px solid rgb(216, 109, 130)",
            fontSize: "16px",


          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 15px",
            backgroundColor: "rgb(230, 60, 94)",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              textAlign: "left",
              margin: "12px auto",
              padding: "15px",
              width: "60%",
              backgroundColor: "rgb(204, 138, 151)",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ddd",
              boxShadow: "0 2px 5px rgb(230, 60, 94)",
            }}
          >
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#6c757d" : "#212529",
              }}
            >
              {task.text}
            </span>
            <div>
              <button
                onClick={() => toggleComplete(index)}
                style={{
                  padding: "5px 10px",
                  marginRight: "10px",
                  backgroundColor: "rgb(223, 88, 115)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ✔
              </button>
              <button
                onClick={() => editTask(index)}
                style={{
                  padding: "5px 10px",
                  marginRight: "10px",
                  backgroundColor: "rgb(223, 88, 115)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ✏️
              </button>
              <button
                onClick={() => deleteTask(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "rgb(212, 106, 127)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ❌ 
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;