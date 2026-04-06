import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import GameList from "./components/GameList";
import GameDetail from "./components/GameDetail";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/"         element={<Home />}       />
          <Route path="/games"    element={<GameList />}   />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="*"         element={<NotFound />}   />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
