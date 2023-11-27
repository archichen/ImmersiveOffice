import { Routes, Route } from "react-router-dom";
import Index from "./index";
import Hm3f from "./hm3f";
import Hm17f from "./hm17f";
import Zj6f from "./zj6f";
import Hm3f_R from "./raycaster";

function Router() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/hm3f" element={<Hm3f />}></Route>
          <Route path="/hm17f" element={<Hm17f />}></Route>
          <Route path="/zj6f" element={<Zj6f />}></Route>
          <Route path="/Hm3f_R" element={<Hm3f_R />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default Router;
