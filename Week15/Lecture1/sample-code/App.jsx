import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ShowList from "./components/ShowList";
import ShowDetail from "./components/ShowDetail";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/"        element={<Home />}       />
          <Route path="/shows"   element={<ShowList />}   />
          <Route path="/shows/:id" element={<ShowDetail />} />
          <Route path="*"        element={<NotFound />}   />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
