import Body from "./page/body"
import { Game } from "./page/game";
import { Route, Routes,BrowserRouter } from "react-router-dom"
import { Login } from "./page/login";



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
