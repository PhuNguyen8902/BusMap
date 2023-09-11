import { BrowserRouter } from "react-router-dom";
import Routers from "./Routers";
import "./assets/scss/index.scss";
import { Header } from "./components";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routers />
    </BrowserRouter>
  );
}

export default App;
