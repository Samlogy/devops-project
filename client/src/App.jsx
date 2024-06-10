import { useState, useRef } from "react";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const textRef = useRef();

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = textRef.current.value;
    console.log(newItem);
    if (!newItem) {
      setItems([...items, { title: newItem }]);
      textRef.current.value = "";
      // push to RDS
    }
  };

  const handleFilesChange = (e) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const onSingleFile = async () => {
    if (file) {
      console.log("file => ", file);
      const formData = new FormData();
      formData.append("file", file);
      // api call => post
    }
  };

  const onMultipleFile = async () => {
    if (files) {
      console.log('files => ', files)
      const formData = new FormData();
      [...files].forEach((file) => {
        formData.append("files", file);
      });
    }
  };

  return (
    <div className="container">
      <h2>Todo App</h2>

      <div>
        <h3>Single File</h3>
        <div>
          <label htmlFor="file" className="sr-only">
            Choose a file
          </label>
          <input id="file" type="file" onChange={handleFileChange} />
        </div>
        <button onClick={onSingleFile}>Upload a file</button>
      </div>

      <div>
        <h3>Multiple Files:</h3>
        <div className="input-group">
          <label htmlFor="file" className="sr-only">
            Choose files
          </label>

          <input id="file" type="file" multiple onChange={handleFilesChange} />
        </div>

        <button onClick={onMultipleFile} className="submit">
          Upload {files.length > 1 ? "files" : "a file"}
        </button>
      </div>

      <form onSubmit={onSubmit}>
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
