import { BrowserRouter } from "react-router-dom";
import RoutingLayer from "./Routes/RoutingLayer";

function App() {
  return (
    <BrowserRouter>
      <RoutingLayer />
    </BrowserRouter>
  )
}

export default App;