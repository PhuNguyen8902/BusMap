import "./App.css";
import Routers from "./Router";
import { BrowserRouter } from "react-router-dom";
import MainDash from "./components/MainDash/MainDash";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <BrowserRouter>
          <Sidebar />
          <Routers />
          {/* <MainDash /> */}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
