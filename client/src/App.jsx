import React, { useState, useRef } from 'react';
import './App.css';

export default function App() {
  const [items, setItems] = useState([]);
  const textRef = useRef()

  const onSingleFile = (e) => {
    e.preventDefault();
    console.log("single => ", e.target.files[0]);
    // push => S3
  };

  const onMultipleFile = (e) => {
    e.preventDefault();
    console.log("multiple => ", e.target.files);
    // push => S3
  };

  const onAddItem = (e) => {
    e.preventDefault();
    const newItem = textRef.current.value;
    if (!newItem) {
      setItems([...items, { title: newItem }]);
      textRef.current.value = '';
      // push to RDS
    }
  };

  return (
    <div className="container">
      <h2>Todo App</h2>
      <form onSubmit={onSingleFile}>
        <h3>Single File</h3>
        <input type="file" />
        <button type="submit">
          upload
        </button>
      </form>

      <form onSubmit={onMultipleFile}>
        <h3>Multiple Files:</h3>
        <input type="file" multiple />
        <button type="submit">
          upload
        </button>
      </form>

      <form onSubmit={onAddItem}>
        <h3>RDS</h3>
        <input type="text" ref={textRef} />
        <button type="submit">Submit</button>
      </form>

      <ul>
        <h3>List S3:</h3>
        {items.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
