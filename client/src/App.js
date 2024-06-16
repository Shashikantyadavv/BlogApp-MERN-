import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddBlog from "./AddBlog";
import Home from "./Home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addblog/:id?" element={<AddBlog />} />
      </Routes>
    </div>
  );
}

export default App;
