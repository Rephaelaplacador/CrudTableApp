import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name: "", age: "" });
  const [editIndex, setEditIndex] = useState(null);

  
  useEffect(() => {
    const savedRows = localStorage.getItem("crudRows");
    if (savedRows) {
      setRows(JSON.parse(savedRows)); 
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("crudRows", JSON.stringify(rows));
  }, [rows]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = form;
      setRows(updatedRows);
      setEditIndex(null);
    } else {
      setRows([...rows, form]);
    }
    setForm({ name: "", age: "" });
  };

  const handleEdit = (index) => {
    setForm(rows[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div className="App">
      <h1>CRUD Table</h1>
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={form.age}
          onChange={handleChange}
        />
        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <table className="crud-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
