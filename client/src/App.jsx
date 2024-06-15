import { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const [status, setStatus] = useState(false);

  const textRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleFilesChange = (e) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = textRef.current.value;
    console.log(newItem);
    if (!newItem) {
      // push to RDS
      textRef.current.value = "";
    }
  };
  const onSingleFile = async () => {
    if (file) {
      console.log("file => ", file);
      const formData = new FormData();
      formData.append("file", file);
      // api call => post
      setStatus(true);
    }
    setTimeout(() => {
      setStatus(false);
    }, 100);
  };
  const onMultipleFile = async () => {
    if (files) {
      console.log("files => ", files);
      const formData = new FormData();
      [...files].forEach((file) => {
        formData.append("files", file);
      });
      setStatus(true);
    }
    setTimeout(() => {
      setStatus(false);
    }, 100);
  };

  useEffect(() => {
    if (status) {
      // fetching item from S3
    }
  }, [status]);

  return (
    <div className="container">
      <h2>Todo App</h2>

      <form>
        <h3>Single File</h3>
        <div>
          <label htmlFor="file" className="sr-only">
            Choose a file
          </label>
          <input id="file" type="file" onChange={handleFileChange} />
        </div>
        <button onClick={onSingleFile}>Upload a file</button>
      </form>

      <form>
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
      </form>

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
