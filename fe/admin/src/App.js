import "./App.css";
import Routers from "./Router";
import { BrowserRouter } from "react-router-dom";
import { Loading, Popup, Sidebar } from "./components";
import { useSelector } from "react-redux";

function App() {
  const popup = useSelector((state) => state.page.popup);
  return (
    <div className="App">
      <div className="AppGlass">
        <BrowserRouter>
          {/* <Sidebar /> */}
          <Routers />
          {/* <MainDash /> */}
          {Object.keys(popup).filter((key) => popup[key] === true).length >
            0 && <Popup>{popup.isLoading && <Loading />}</Popup>}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
