import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import KeyValueAccordion from "./components/KeyValueAccordion";

function App() {
  const [count, setCount] = useState(0);
  const data = [
    { key: "Name", value: "Test test" },
    { key: "Age", value: "30" },
    { key: "Email", value: "test@test.com" },
  ];

  return (
    <div>
      <KeyValueAccordion data={data} />
    </div>
  );
}

export default App;
