import Body from "./page/body"
import { Route, Routes,BrowserRouter } from "react-router-dom"



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
